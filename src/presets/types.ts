export type InterpolationMode = "BEZIER" | "LINEAR" | "HOLD" | "EASE_IN" | "EASE_OUT";

// ──────────────────────────────────────────────────────────────────────────
// PRESET CATEGORIES
// ──────────────────────────────────────────────────────────────────────────

export type TransitionCategory =
  | "zoom"
  | "slide"
  | "push"
  | "whip"
  | "rotation"
  | "camera"
  | "special";

export const CATEGORY_LABELS: Record<TransitionCategory, string> = {
  zoom:     "Zoom",
  slide:    "Slide",
  push:     "Push",
  whip:     "Whip",
  rotation: "Rotation",
  camera:   "Camera",
  special:  "Special",
};

// ──────────────────────────────────────────────────────────────────────────
// PARAMETER TYPES
// ──────────────────────────────────────────────────────────────────────────

export type AnimatedParamType = "scale" | "position" | "rotation" | "opacity";

/**
 * For Scale/Rotation/Opacity: direct value.
 *   scale    — 100 = 100%, 120 = 120% (zoomed in)
 *   rotation — degrees, positive = CW
 *   opacity  — 0..100
 *
 * For Position: offset ratios relative to sequence center.
 *   { xRatio: 0, yRatio: 0 } = clip at natural center position
 *   { xRatio: 1.0, yRatio: 0 } = shifted 1 full frame-width to the RIGHT
 *   At runtime: x = seqW/2 + xRatio * seqW,  y = seqH/2 + yRatio * seqH
 */
export type PresetKeyframeValue =
  | number
  | { xRatio: number; yRatio: number };

// ──────────────────────────────────────────────────────────────────────────
// KEYFRAME DATA
// ──────────────────────────────────────────────────────────────────────────

export interface PresetKeyframe {
  /** Frame offset from the START of this transition window (0 = first frame). */
  frame: number;
  value: PresetKeyframeValue;
  interpolation: InterpolationMode;
}

// ──────────────────────────────────────────────────────────────────────────
// PARAMETER ANIMATION TRACK
// ──────────────────────────────────────────────────────────────────────────

export interface ParameterAnimation {
  param: AnimatedParamType;
  /** Keyframes define the "IN" (beginning) direction. Engine mirrors them for "end". */
  keyframes: PresetKeyframe[];
}

// ──────────────────────────────────────────────────────────────────────────
// TRANSITION PRESET  (the core schema for every transition in the library)
// ──────────────────────────────────────────────────────────────────────────

export interface TransitionPreset {
  id: string;
  name: string;
  category: TransitionCategory;
  /**
   * Reference duration in frames at 24 fps.
   * The engine scales this to the actual sequence frame rate.
   * User can override via the duration slider.
   */
  duration: number;
  description: string;
  parameters: ParameterAnimation[];
}

// ──────────────────────────────────────────────────────────────────────────
// APPLY OPTIONS  (passed to TransitionEngine)
// ──────────────────────────────────────────────────────────────────────────

export type TransitionPlacement = "beginning" | "end";

export interface ApplyOptions {
  placement: TransitionPlacement;
  /** Override preset duration (in frames at actual fps). null = use preset default. */
  durationFrames: number | null;
}
