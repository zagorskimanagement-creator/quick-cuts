import type {
  VideoClipTrackItem,
  ComponentParam,
  PointF,
  Action,
  TickTime,
  PremierePro,
} from "premierepro";
import type { TransitionPreset, ParameterAnimation, PresetKeyframe, ApplyOptions } from "../presets/types";
import { getMotionParam, getOpacityParam, MOTION_PARAM } from "./MotionService";
import { buildParamKeyframeActions, commitActions } from "./KeyframeService";
import type { KeyframeSpec } from "./KeyframeService";
import { buildLocalKfTime, parseFrameRate, tickTimeToFrames } from "../utils/TimeUtils";
import { Logger } from "../utils/Logger";

const ppro = require("premierepro") as PremierePro;

// ──────────────────────────────────────────────────────────────────────────
// COORDINATE SYSTEM DETECTION
// ──────────────────────────────────────────────────────────────────────────

/**
 * Detects whether Premiere's Position parameter uses pixel or normalized coordinates.
 *
 * Standard Premiere Pro stores Position in pixels (center of 1920×1080 = {960, 540}).
 * Some API versions may use normalized 0–1 values (center = {0.5, 0.5}).
 *
 * Strategy: read the current value. If x > 2, assume pixels.
 */
async function detectPositionCoordSystem(
  posParam: ComponentParam,
  sampleTime: TickTime
): Promise<"pixels" | "normalized"> {
  try {
    const raw = await posParam.getValueAtTime(sampleTime);
    if (raw && typeof (raw as PointF).x === "number") {
      return (raw as PointF).x > 2 ? "pixels" : "normalized";
    }
  } catch {
    // Ignore — fall through
  }
  return "pixels"; // Safe default (Premiere Pro standard)
}

/**
 * Converts a preset position offset (xRatio/yRatio centered, in frame-widths)
 * to the actual value expected by the API.
 *
 *   { xRatio: 0, yRatio: 0 } = natural center position
 *   { xRatio: 1.0, yRatio: 0 } = one full frame-width RIGHT of center
 */
function resolvePositionValue(
  offset: { xRatio: number; yRatio: number },
  seqW: number,
  seqH: number,
  coordSystem: "pixels" | "normalized"
): PointF {
  if (coordSystem === "pixels") {
    return {
      x: seqW / 2 + offset.xRatio * seqW,
      y: seqH / 2 + offset.yRatio * seqH,
    };
  }
  // Normalized 0–1: center = 0.5
  return {
    x: 0.5 + offset.xRatio * 0.5,
    y: 0.5 + offset.yRatio * 0.5,
  };
}

// ──────────────────────────────────────────────────────────────────────────
// PARAMETER RESOLVER
// ──────────────────────────────────────────────────────────────────────────

async function resolveParam(
  clip: VideoClipTrackItem,
  paramType: ParameterAnimation["param"]
): Promise<ComponentParam | null> {
  switch (paramType) {
    case "scale":    return getMotionParam(clip, MOTION_PARAM.SCALE);
    case "position": return getMotionParam(clip, MOTION_PARAM.POSITION);
    case "rotation": return getMotionParam(clip, MOTION_PARAM.ROTATION);
    case "opacity":  return getOpacityParam(clip);
    default:         return null;
  }
}

// ──────────────────────────────────────────────────────────────────────────
// KEYFRAME REVERSAL  (for "end" placement)
// ──────────────────────────────────────────────────────────────────────────

/**
 * Reverses keyframe order within a [0..duration] window for "end" placement.
 * The preset defines the "IN" (beginning) animation.
 * For "end": reverse so the motion exits instead of entering.
 *
 * Example — preset frames [0, 12]:
 *   beginning: kf[0] value at t=0, kf[1] value at t=12
 *   end:       kf[1] value at t=0, kf[0] value at t=12
 */
function reverseKeyframes(
  keyframes: PresetKeyframe[],
  targetDuration: number
): PresetKeyframe[] {
  const reversed = [...keyframes].reverse();
  const n = reversed.length;
  return reversed.map((kf, i) => ({
    ...kf,
    frame: n > 1 ? Math.round((i / (n - 1)) * targetDuration) : 0,
  }));
}

// ──────────────────────────────────────────────────────────────────────────
// DURATION SCALING
// ──────────────────────────────────────────────────────────────────────────

/**
 * Re-maps preset keyframe frames from [0..presetDuration] to [0..targetDuration].
 */
function scaleKeyframes(
  keyframes: PresetKeyframe[],
  presetDuration: number,
  targetDuration: number
): PresetKeyframe[] {
  if (presetDuration === 0) return keyframes;
  return keyframes.map((kf) => ({
    ...kf,
    frame: Math.round((kf.frame / presetDuration) * targetDuration),
  }));
}

// ──────────────────────────────────────────────────────────────────────────
// MAIN ENGINE
// ──────────────────────────────────────────────────────────────────────────

export interface TransitionResult {
  success: boolean;
  message: string;
}

/**
 * Applies a TransitionPreset to a VideoClipTrackItem.
 *
 * Algorithm:
 * 1. Gather sequence context (timebase, frame size).
 * 2. Validate clip duration vs transition duration.
 * 3. Calculate window start frame (0 for beginning, last N frames for end).
 * 4. Detect position coordinate system once.
 * 5. For each parameter animation:
 *    a. Resolve the ComponentParam.
 *    b. Mirror/scale keyframes to actual duration and placement.
 *    c. Build KeyframeSpec objects (absolute TickTime + resolved value).
 *    d. Collect Action objects.
 * 6. Commit all actions in one atomic undo transaction.
 */
export async function applyTransition(
  clip: VideoClipTrackItem,
  preset: TransitionPreset,
  options: ApplyOptions
): Promise<TransitionResult> {
  try {
    // ── Context ─────────────────────────────────────────────────────────
    const project = await ppro.Project.getActiveProject();
    if (!project) return { success: false, message: "No active project" };

    const sequence = await project.getActiveSequence();
    if (!sequence) return { success: false, message: "No active sequence" };

    const timebase    = await sequence.getTimebase();
    const seqSettings = await sequence.getSettings();
    const seqW        = seqSettings.videoFrameWidth;
    const seqH        = seqSettings.videoFrameHeight;
    const fps         = parseFrameRate(timebase);

    const clipInPoint  = await clip.getInPoint();
    const clipDuration = await clip.getDuration();
    const clipFrames   = tickTimeToFrames(clipDuration, timebase);

    // ── Duration ────────────────────────────────────────────────────────
    // User slider provides frames at actual fps.
    // Fallback: scale preset reference duration from 24fps to actual fps.
    const transitionFrames =
      options.durationFrames !== null
        ? options.durationFrames
        : Math.round((preset.duration * fps) / 24);

    if (transitionFrames >= clipFrames) {
      return {
        success: false,
        message: `Clip too short (${clipFrames}f) for ${transitionFrames}f transition`,
      };
    }

    // ── Window start ────────────────────────────────────────────────────
    const windowStartFrame =
      options.placement === "beginning" ? 0 : clipFrames - transitionFrames;

    // ── Position coord system (detect once per clip) ─────────────────────
    const posParam = await getMotionParam(clip, MOTION_PARAM.POSITION);
    let coordSystem: "pixels" | "normalized" = "pixels";
    if (posParam) {
      const sampleTime = buildLocalKfTime(clipInPoint, windowStartFrame, timebase);
      coordSystem = await detectPositionCoordSystem(posParam, sampleTime);
    }

    // ── Build actions ────────────────────────────────────────────────────
    const allActions: Action[] = [];

    for (const paramAnim of preset.parameters) {
      const param = await resolveParam(clip, paramAnim.param);
      if (!param) {
        Logger.warn(`Param "${paramAnim.param}" not found on clip — skipping`);
        continue;
      }

      // Select and adjust keyframes
      let kfDefs = paramAnim.keyframes;
      if (options.placement === "end") {
        kfDefs = reverseKeyframes(kfDefs, preset.duration);
      }
      kfDefs = scaleKeyframes(kfDefs, preset.duration, transitionFrames);

      // Build KeyframeSpec list
      const specs: KeyframeSpec[] = kfDefs.map((kf) => {
        const absoluteFrame = windowStartFrame + kf.frame;
        const time = buildLocalKfTime(clipInPoint, absoluteFrame, timebase);

        const value: number | PointF =
          typeof kf.value === "number"
            ? kf.value
            : resolvePositionValue(kf.value, seqW, seqH, coordSystem);

        return { time, value, interpolation: kf.interpolation };
      });

      const paramActions = buildParamKeyframeActions(param, specs);
      allActions.push(...paramActions);
    }

    if (allActions.length === 0) {
      return { success: false, message: "No animatable parameters found on clip" };
    }

    // ── Commit ───────────────────────────────────────────────────────────
    await commitActions(
      allActions,
      `Quick Transitions: ${preset.name} (${options.placement})`
    );

    Logger.info(
      `Applied "${preset.name}" at ${options.placement} — ${allActions.length} actions`
    );
    return {
      success: true,
      message: `Applied "${preset.name}" at ${options.placement}`,
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    Logger.error("applyTransition failed:", msg);
    return { success: false, message: msg };
  }
}
