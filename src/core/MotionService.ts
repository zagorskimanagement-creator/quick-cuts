import type { VideoClipTrackItem, VideoComponent, ComponentParam } from "premierepro";
import { Logger } from "../utils/Logger";

/**
 * Match names for built-in Premiere Pro effect components.
 * Both "AE.ADBE *" (newer) and "ADBE *" (legacy) forms may appear.
 */
export const MATCH_NAMES = {
  MOTION:    ["AE.ADBE Motion",  "ADBE Motion"],
  OPACITY:   ["AE.ADBE Opacity", "ADBE Opacity"],
  TRANSFORM: ["AE.ADBE Geometry2", "ADBE Geometry2"],
} as const;

/**
 * Indices within the Motion (AE.ADBE Motion) component.
 * Verified against: OpenCurve/plugin.js and community type declarations.
 */
export const MOTION_PARAM = {
  POSITION:     0, // PointF — pixels from top-left, center ≈ {seqW/2, seqH/2}
  SCALE:        1, // number — 100 = 100%
  SCALE_WIDTH:  2, // number (when uniform scale is unlinked)
  SCALE_HEIGHT: 3,
  ROTATION:     4, // number — degrees, positive = CW
  ANCHOR:       5, // PointF
} as const;

export const OPACITY_PARAM = {
  OPACITY: 0, // number 0–100
} as const;

/**
 * Finds a video component on the clip by match name(s).
 * Returns null if not found.
 */
export async function findComponent(
  clip: VideoClipTrackItem,
  candidateMatchNames: readonly string[]
): Promise<VideoComponent | null> {
  const chain = await clip.getComponentChain();
  const count = chain.getComponentCount();

  for (let i = 0; i < count; i++) {
    const comp = chain.getComponentAtIndex(i);
    const matchName = await comp.getMatchName();
    if (candidateMatchNames.includes(matchName)) {
      return comp;
    }
  }

  Logger.debug(`Component not found. Searched: ${candidateMatchNames.join(", ")}`);
  return null;
}

export async function getMotionComponent(
  clip: VideoClipTrackItem
): Promise<VideoComponent | null> {
  return findComponent(clip, MATCH_NAMES.MOTION);
}

export async function getOpacityComponent(
  clip: VideoClipTrackItem
): Promise<VideoComponent | null> {
  return findComponent(clip, MATCH_NAMES.OPACITY);
}

export async function getMotionParam(
  clip: VideoClipTrackItem,
  paramIndex: number
): Promise<ComponentParam | null> {
  const motion = await getMotionComponent(clip);
  if (!motion) return null;
  return motion.getParam(paramIndex);
}

export async function getOpacityParam(
  clip: VideoClipTrackItem
): Promise<ComponentParam | null> {
  const opacityComp = await getOpacityComponent(clip);
  if (!opacityComp) return null;
  return opacityComp.getParam(OPACITY_PARAM.OPACITY);
}
