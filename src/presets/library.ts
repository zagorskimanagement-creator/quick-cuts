/**
 * QUICK TRANSITION BUILDER — Complete Preset Library
 * 61 professional transitions across 7 categories.
 *
 * JSON-SCHEMA for each preset:
 * {
 *   id:          unique snake_case identifier
 *   name:        display name
 *   category:    zoom | slide | push | whip | rotation | camera | special
 *   duration:    reference frames at 24 fps
 *   description: one-line description for UI tooltip
 *   parameters:  array of { param, keyframes[] }
 * }
 *
 * KEYFRAME VALUE CONVENTIONS:
 *   scale    — 100 = normal, 120 = 20% zoomed in
 *   rotation — degrees (positive = clockwise)
 *   opacity  — 0..100 percent
 *   position — { xRatio, yRatio } offset from center in frame-widths
 *              e.g. { xRatio: 1.0, yRatio: 0 } = 1 frame-width RIGHT of center
 *
 * INTERPOLATION INDUSTRY STANDARDS:
 *   BEZIER  — smooth ease-in/out, best for organic motion
 *   LINEAR  — constant speed, best for mechanical/fast snaps
 *   EASE_IN — fast start, slow end (momentum into shot)
 *   EASE_OUT— slow start, fast end (decelerates into frame)
 *   HOLD    — instant value change (no interpolation)
 */

import type { TransitionPreset } from "./types";

// ──────────────────────────────────────────────────────────────────────────
// CATEGORY: ZOOM  (15 presets)
// ──────────────────────────────────────────────────────────────────────────

const ZOOM_PRESETS: TransitionPreset[] = [
  {
    id: "zoom_in",
    name: "Zoom In",
    category: "zoom",
    duration: 12,
    description: "Clip scales from 120% to 100% — classic enter zoom",
    parameters: [
      {
        param: "scale",
        keyframes: [
          { frame: 0, value: 120, interpolation: "BEZIER" },
          { frame: 12, value: 100, interpolation: "BEZIER" },
        ],
      },
    ],
  },
  {
    id: "zoom_out",
    name: "Zoom Out",
    category: "zoom",
    duration: 12,
    description: "Clip scales from 80% to 100% — pull-away entrance",
    parameters: [
      {
        param: "scale",
        keyframes: [
          { frame: 0, value: 80, interpolation: "BEZIER" },
          { frame: 12, value: 100, interpolation: "BEZIER" },
        ],
      },
    ],
  },
  {
    id: "fast_zoom_in",
    name: "Fast Zoom In",
    category: "zoom",
    duration: 8,
    description: "Aggressive 150% → 100% zoom, 8 frames",
    parameters: [
      {
        param: "scale",
        keyframes: [
          { frame: 0, value: 150, interpolation: "EASE_OUT" },
          { frame: 8, value: 100, interpolation: "EASE_OUT" },
        ],
      },
    ],
  },
  {
    id: "fast_zoom_out",
    name: "Fast Zoom Out",
    category: "zoom",
    duration: 8,
    description: "Snap from 60% to 100%, aggressive pull back",
    parameters: [
      {
        param: "scale",
        keyframes: [
          { frame: 0, value: 60, interpolation: "EASE_OUT" },
          { frame: 8, value: 100, interpolation: "EASE_OUT" },
        ],
      },
    ],
  },
  {
    id: "smooth_zoom_in",
    name: "Smooth Zoom In",
    category: "zoom",
    duration: 20,
    description: "Gentle 108% → 100%, long eased approach",
    parameters: [
      {
        param: "scale",
        keyframes: [
          { frame: 0, value: 108, interpolation: "BEZIER" },
          { frame: 20, value: 100, interpolation: "BEZIER" },
        ],
      },
    ],
  },
  {
    id: "smooth_zoom_out",
    name: "Smooth Zoom Out",
    category: "zoom",
    duration: 20,
    description: "Subtle 92% → 100%, relaxed pull-away",
    parameters: [
      {
        param: "scale",
        keyframes: [
          { frame: 0, value: 92, interpolation: "BEZIER" },
          { frame: 20, value: 100, interpolation: "BEZIER" },
        ],
      },
    ],
  },
  {
    id: "cinematic_zoom",
    name: "Cinematic Zoom",
    category: "zoom",
    duration: 16,
    description: "Scale 115→100 with subtle upward drift — cinema feel",
    parameters: [
      {
        param: "scale",
        keyframes: [
          { frame: 0, value: 115, interpolation: "BEZIER" },
          { frame: 16, value: 100, interpolation: "BEZIER" },
        ],
      },
      {
        param: "position",
        keyframes: [
          { frame: 0,  value: { xRatio: 0, yRatio: 0.04 }, interpolation: "BEZIER" },
          { frame: 16, value: { xRatio: 0, yRatio: 0 },    interpolation: "BEZIER" },
        ],
      },
    ],
  },
  {
    id: "dynamic_punch_in",
    name: "Dynamic Punch In",
    category: "zoom",
    duration: 6,
    description: "Extreme 140% → 100% snap, high energy",
    parameters: [
      {
        param: "scale",
        keyframes: [
          { frame: 0, value: 140, interpolation: "EASE_OUT" },
          { frame: 6, value: 100, interpolation: "EASE_OUT" },
        ],
      },
    ],
  },
  {
    id: "dynamic_punch_out",
    name: "Dynamic Punch Out",
    category: "zoom",
    duration: 6,
    description: "Fast snap from 100% → 140%, burst exit",
    parameters: [
      {
        param: "scale",
        keyframes: [
          { frame: 0, value: 100, interpolation: "EASE_IN" },
          { frame: 6, value: 140, interpolation: "EASE_IN" },
        ],
      },
    ],
  },
  {
    id: "scale_pop",
    name: "Scale Pop",
    category: "zoom",
    duration: 18,
    description: "Spring overshoot: 0 → 112 → 100 (bounce in)",
    parameters: [
      {
        param: "scale",
        keyframes: [
          { frame: 0,  value: 0,   interpolation: "BEZIER" },
          { frame: 14, value: 112, interpolation: "BEZIER" },
          { frame: 18, value: 100, interpolation: "BEZIER" },
        ],
      },
    ],
  },
  {
    id: "micro_zoom",
    name: "Micro Zoom",
    category: "zoom",
    duration: 12,
    description: "Very subtle 103% → 100%, barely noticeable polish",
    parameters: [
      {
        param: "scale",
        keyframes: [
          { frame: 0,  value: 103, interpolation: "BEZIER" },
          { frame: 12, value: 100, interpolation: "BEZIER" },
        ],
      },
    ],
  },
  {
    id: "crash_zoom",
    name: "Crash Zoom",
    category: "zoom",
    duration: 4,
    description: "Extreme 250% → 100% in 4 frames — crash impact",
    parameters: [
      {
        param: "scale",
        keyframes: [
          { frame: 0, value: 250, interpolation: "EASE_OUT" },
          { frame: 4, value: 100, interpolation: "EASE_OUT" },
        ],
      },
    ],
  },
  {
    id: "ken_burns_in",
    name: "Ken Burns In",
    category: "zoom",
    duration: 48,
    description: "Slow 110% → 100% with diagonal drift — documentary style",
    parameters: [
      {
        param: "scale",
        keyframes: [
          { frame: 0,  value: 110, interpolation: "LINEAR" },
          { frame: 48, value: 100, interpolation: "LINEAR" },
        ],
      },
      {
        param: "position",
        keyframes: [
          { frame: 0,  value: { xRatio: 0.03, yRatio: 0.03 },  interpolation: "LINEAR" },
          { frame: 48, value: { xRatio: 0, yRatio: 0 },        interpolation: "LINEAR" },
        ],
      },
    ],
  },
  {
    id: "blur_zoom",
    name: "Blur Zoom",
    category: "zoom",
    duration: 8,
    description: "130% → 100% fast scale (pair with motion blur for best result)",
    parameters: [
      {
        param: "scale",
        keyframes: [
          { frame: 0, value: 130, interpolation: "EASE_OUT" },
          { frame: 8, value: 100, interpolation: "EASE_OUT" },
        ],
      },
    ],
  },
  {
    id: "snap_zoom",
    name: "Snap Zoom",
    category: "zoom",
    duration: 3,
    description: "300% → 100% in 3 frames — extreme snap impact",
    parameters: [
      {
        param: "scale",
        keyframes: [
          { frame: 0, value: 300, interpolation: "LINEAR" },
          { frame: 3, value: 100, interpolation: "LINEAR" },
        ],
      },
    ],
  },
];

// ──────────────────────────────────────────────────────────────────────────
// CATEGORY: SLIDE  (8 presets)
// Position xRatio/yRatio: 1.0 = 1 full frame-width offset from center
// Beginning: clip enters from offset → 0  (natural center)
// End:       engine reverses automatically
// ──────────────────────────────────────────────────────────────────────────

const SLIDE_PRESETS: TransitionPreset[] = [
  {
    id: "slide_left",
    name: "Slide Left",
    category: "slide",
    duration: 12,
    description: "Clip enters sliding from right to center",
    parameters: [
      {
        param: "position",
        keyframes: [
          { frame: 0,  value: { xRatio: 1.0, yRatio: 0 }, interpolation: "BEZIER" },
          { frame: 12, value: { xRatio: 0,   yRatio: 0 }, interpolation: "BEZIER" },
        ],
      },
    ],
  },
  {
    id: "slide_right",
    name: "Slide Right",
    category: "slide",
    duration: 12,
    description: "Clip enters sliding from left to center",
    parameters: [
      {
        param: "position",
        keyframes: [
          { frame: 0,  value: { xRatio: -1.0, yRatio: 0 }, interpolation: "BEZIER" },
          { frame: 12, value: { xRatio: 0,    yRatio: 0 }, interpolation: "BEZIER" },
        ],
      },
    ],
  },
  {
    id: "slide_up",
    name: "Slide Up",
    category: "slide",
    duration: 12,
    description: "Clip enters rising from below",
    parameters: [
      {
        param: "position",
        keyframes: [
          { frame: 0,  value: { xRatio: 0, yRatio: 1.0 },  interpolation: "BEZIER" },
          { frame: 12, value: { xRatio: 0, yRatio: 0 },    interpolation: "BEZIER" },
        ],
      },
    ],
  },
  {
    id: "slide_down",
    name: "Slide Down",
    category: "slide",
    duration: 12,
    description: "Clip enters dropping from above",
    parameters: [
      {
        param: "position",
        keyframes: [
          { frame: 0,  value: { xRatio: 0, yRatio: -1.0 }, interpolation: "BEZIER" },
          { frame: 12, value: { xRatio: 0, yRatio: 0 },    interpolation: "BEZIER" },
        ],
      },
    ],
  },
  {
    id: "float_in_left",
    name: "Float In Left",
    category: "slide",
    duration: 16,
    description: "Subtle 30% drift from right — elegant entrance",
    parameters: [
      {
        param: "position",
        keyframes: [
          { frame: 0,  value: { xRatio: 0.3, yRatio: 0 }, interpolation: "BEZIER" },
          { frame: 16, value: { xRatio: 0,   yRatio: 0 }, interpolation: "BEZIER" },
        ],
      },
    ],
  },
  {
    id: "float_in_right",
    name: "Float In Right",
    category: "slide",
    duration: 16,
    description: "Subtle 30% drift from left — elegant entrance",
    parameters: [
      {
        param: "position",
        keyframes: [
          { frame: 0,  value: { xRatio: -0.3, yRatio: 0 }, interpolation: "BEZIER" },
          { frame: 16, value: { xRatio: 0,    yRatio: 0 }, interpolation: "BEZIER" },
        ],
      },
    ],
  },
  {
    id: "drift_left",
    name: "Drift Left",
    category: "slide",
    duration: 24,
    description: "Very subtle 5% position drift — nearly invisible polish",
    parameters: [
      {
        param: "position",
        keyframes: [
          { frame: 0,  value: { xRatio: 0.05, yRatio: 0 }, interpolation: "BEZIER" },
          { frame: 24, value: { xRatio: 0,    yRatio: 0 }, interpolation: "BEZIER" },
        ],
      },
    ],
  },
  {
    id: "vertical_push",
    name: "Vertical Push",
    category: "slide",
    duration: 14,
    description: "Full frame vertical push + mild zoom combination",
    parameters: [
      {
        param: "position",
        keyframes: [
          { frame: 0,  value: { xRatio: 0, yRatio: 1.0 }, interpolation: "EASE_OUT" },
          { frame: 14, value: { xRatio: 0, yRatio: 0 },   interpolation: "EASE_OUT" },
        ],
      },
      {
        param: "scale",
        keyframes: [
          { frame: 0,  value: 105, interpolation: "BEZIER" },
          { frame: 14, value: 100, interpolation: "BEZIER" },
        ],
      },
    ],
  },
];

// ──────────────────────────────────────────────────────────────────────────
// CATEGORY: PUSH  (8 presets)
// ──────────────────────────────────────────────────────────────────────────

const PUSH_PRESETS: TransitionPreset[] = [
  {
    id: "push_left",
    name: "Push Left",
    category: "push",
    duration: 12,
    description: "Full-frame push from right at normal speed",
    parameters: [
      {
        param: "position",
        keyframes: [
          { frame: 0,  value: { xRatio: 1.0, yRatio: 0 }, interpolation: "BEZIER" },
          { frame: 12, value: { xRatio: 0,   yRatio: 0 }, interpolation: "BEZIER" },
        ],
      },
    ],
  },
  {
    id: "push_right",
    name: "Push Right",
    category: "push",
    duration: 12,
    description: "Full-frame push from left at normal speed",
    parameters: [
      {
        param: "position",
        keyframes: [
          { frame: 0,  value: { xRatio: -1.0, yRatio: 0 }, interpolation: "BEZIER" },
          { frame: 12, value: { xRatio: 0,    yRatio: 0 }, interpolation: "BEZIER" },
        ],
      },
    ],
  },
  {
    id: "push_up",
    name: "Push Up",
    category: "push",
    duration: 12,
    description: "Full-frame push from below",
    parameters: [
      {
        param: "position",
        keyframes: [
          { frame: 0,  value: { xRatio: 0, yRatio: 1.0 }, interpolation: "BEZIER" },
          { frame: 12, value: { xRatio: 0, yRatio: 0 },   interpolation: "BEZIER" },
        ],
      },
    ],
  },
  {
    id: "push_down",
    name: "Push Down",
    category: "push",
    duration: 12,
    description: "Full-frame push from above",
    parameters: [
      {
        param: "position",
        keyframes: [
          { frame: 0,  value: { xRatio: 0, yRatio: -1.0 }, interpolation: "BEZIER" },
          { frame: 12, value: { xRatio: 0, yRatio: 0 },    interpolation: "BEZIER" },
        ],
      },
    ],
  },
  {
    id: "hard_push_left",
    name: "Hard Push Left",
    category: "push",
    duration: 6,
    description: "Fast 6-frame linear push — sharp cut feel",
    parameters: [
      {
        param: "position",
        keyframes: [
          { frame: 0, value: { xRatio: 1.0, yRatio: 0 }, interpolation: "LINEAR" },
          { frame: 6, value: { xRatio: 0,   yRatio: 0 }, interpolation: "LINEAR" },
        ],
      },
    ],
  },
  {
    id: "hard_push_right",
    name: "Hard Push Right",
    category: "push",
    duration: 6,
    description: "Fast 6-frame linear push from left",
    parameters: [
      {
        param: "position",
        keyframes: [
          { frame: 0, value: { xRatio: -1.0, yRatio: 0 }, interpolation: "LINEAR" },
          { frame: 6, value: { xRatio: 0,    yRatio: 0 }, interpolation: "LINEAR" },
        ],
      },
    ],
  },
  {
    id: "push_zoom_left",
    name: "Push Zoom Left",
    category: "push",
    duration: 12,
    description: "Push from right combined with 110%→100% zoom",
    parameters: [
      {
        param: "position",
        keyframes: [
          { frame: 0,  value: { xRatio: 1.0, yRatio: 0 }, interpolation: "BEZIER" },
          { frame: 12, value: { xRatio: 0,   yRatio: 0 }, interpolation: "BEZIER" },
        ],
      },
      {
        param: "scale",
        keyframes: [
          { frame: 0,  value: 110, interpolation: "BEZIER" },
          { frame: 12, value: 100, interpolation: "BEZIER" },
        ],
      },
    ],
  },
  {
    id: "push_diagonal",
    name: "Push Diagonal",
    category: "push",
    duration: 14,
    description: "Push from bottom-right corner to center",
    parameters: [
      {
        param: "position",
        keyframes: [
          { frame: 0,  value: { xRatio: 0.7, yRatio: 0.7 }, interpolation: "BEZIER" },
          { frame: 14, value: { xRatio: 0,   yRatio: 0 },   interpolation: "BEZIER" },
        ],
      },
    ],
  },
];

// ──────────────────────────────────────────────────────────────────────────
// CATEGORY: WHIP  (6 presets)
// Fast, energetic camera-whip style movements
// ──────────────────────────────────────────────────────────────────────────

const WHIP_PRESETS: TransitionPreset[] = [
  {
    id: "whip_left",
    name: "Whip Left",
    category: "whip",
    duration: 6,
    description: "Fast whip-pan right→left with slight scale drop",
    parameters: [
      {
        param: "position",
        keyframes: [
          { frame: 0, value: { xRatio: 1.5, yRatio: 0 }, interpolation: "EASE_OUT" },
          { frame: 6, value: { xRatio: 0,   yRatio: 0 }, interpolation: "EASE_OUT" },
        ],
      },
      {
        param: "scale",
        keyframes: [
          { frame: 0, value: 95, interpolation: "BEZIER" },
          { frame: 6, value: 100, interpolation: "BEZIER" },
        ],
      },
    ],
  },
  {
    id: "whip_right",
    name: "Whip Right",
    category: "whip",
    duration: 6,
    description: "Fast whip-pan left→right",
    parameters: [
      {
        param: "position",
        keyframes: [
          { frame: 0, value: { xRatio: -1.5, yRatio: 0 }, interpolation: "EASE_OUT" },
          { frame: 6, value: { xRatio: 0,    yRatio: 0 }, interpolation: "EASE_OUT" },
        ],
      },
      {
        param: "scale",
        keyframes: [
          { frame: 0, value: 95, interpolation: "BEZIER" },
          { frame: 6, value: 100, interpolation: "BEZIER" },
        ],
      },
    ],
  },
  {
    id: "whip_up",
    name: "Whip Up",
    category: "whip",
    duration: 6,
    description: "Fast vertical whip from below",
    parameters: [
      {
        param: "position",
        keyframes: [
          { frame: 0, value: { xRatio: 0, yRatio: 1.5 }, interpolation: "EASE_OUT" },
          { frame: 6, value: { xRatio: 0, yRatio: 0 },   interpolation: "EASE_OUT" },
        ],
      },
    ],
  },
  {
    id: "whip_down",
    name: "Whip Down",
    category: "whip",
    duration: 6,
    description: "Fast vertical whip from above",
    parameters: [
      {
        param: "position",
        keyframes: [
          { frame: 0, value: { xRatio: 0, yRatio: -1.5 }, interpolation: "EASE_OUT" },
          { frame: 6, value: { xRatio: 0, yRatio: 0 },    interpolation: "EASE_OUT" },
        ],
      },
    ],
  },
  {
    id: "quick_pan_left",
    name: "Quick Pan Left",
    category: "whip",
    duration: 10,
    description: "Medium-speed pan from right, 10 frames",
    parameters: [
      {
        param: "position",
        keyframes: [
          { frame: 0,  value: { xRatio: 1.0, yRatio: 0 }, interpolation: "EASE_OUT" },
          { frame: 10, value: { xRatio: 0,   yRatio: 0 }, interpolation: "EASE_OUT" },
        ],
      },
    ],
  },
  {
    id: "quick_pan_right",
    name: "Quick Pan Right",
    category: "whip",
    duration: 10,
    description: "Medium-speed pan from left, 10 frames",
    parameters: [
      {
        param: "position",
        keyframes: [
          { frame: 0,  value: { xRatio: -1.0, yRatio: 0 }, interpolation: "EASE_OUT" },
          { frame: 10, value: { xRatio: 0,    yRatio: 0 }, interpolation: "EASE_OUT" },
        ],
      },
    ],
  },
];

// ──────────────────────────────────────────────────────────────────────────
// CATEGORY: ROTATION  (8 presets)
// ──────────────────────────────────────────────────────────────────────────

const ROTATION_PRESETS: TransitionPreset[] = [
  {
    id: "spin_cw",
    name: "Spin CW",
    category: "rotation",
    duration: 14,
    description: "Clockwise rotation 90°→0°, eased",
    parameters: [
      {
        param: "rotation",
        keyframes: [
          { frame: 0,  value: 90, interpolation: "BEZIER" },
          { frame: 14, value: 0,  interpolation: "BEZIER" },
        ],
      },
    ],
  },
  {
    id: "spin_ccw",
    name: "Spin CCW",
    category: "rotation",
    duration: 14,
    description: "Counter-clockwise -90°→0°, eased",
    parameters: [
      {
        param: "rotation",
        keyframes: [
          { frame: 0,  value: -90, interpolation: "BEZIER" },
          { frame: 14, value: 0,   interpolation: "BEZIER" },
        ],
      },
    ],
  },
  {
    id: "rotation_transition",
    name: "Rotation Transition",
    category: "rotation",
    duration: 16,
    description: "Full 360° rotation with zoom-in combination",
    parameters: [
      {
        param: "rotation",
        keyframes: [
          { frame: 0,  value: 360, interpolation: "EASE_OUT" },
          { frame: 16, value: 0,   interpolation: "EASE_OUT" },
        ],
      },
      {
        param: "scale",
        keyframes: [
          { frame: 0,  value: 130, interpolation: "BEZIER" },
          { frame: 16, value: 100, interpolation: "BEZIER" },
        ],
      },
    ],
  },
  {
    id: "tilt_in",
    name: "Tilt In",
    category: "rotation",
    duration: 12,
    description: "Gentle 12°→0° tilt — organic camera handoff",
    parameters: [
      {
        param: "rotation",
        keyframes: [
          { frame: 0,  value: 12, interpolation: "BEZIER" },
          { frame: 12, value: 0,  interpolation: "BEZIER" },
        ],
      },
    ],
  },
  {
    id: "tilt_in_left",
    name: "Tilt In Left",
    category: "rotation",
    duration: 12,
    description: "Negative tilt -12°→0° from opposite side",
    parameters: [
      {
        param: "rotation",
        keyframes: [
          { frame: 0,  value: -12, interpolation: "BEZIER" },
          { frame: 12, value: 0,   interpolation: "BEZIER" },
        ],
      },
    ],
  },
  {
    id: "micro_rotation",
    name: "Micro Rotation",
    category: "rotation",
    duration: 16,
    description: "3°→0° extremely subtle rotation — nearly invisible polish",
    parameters: [
      {
        param: "rotation",
        keyframes: [
          { frame: 0,  value: 3, interpolation: "BEZIER" },
          { frame: 16, value: 0, interpolation: "BEZIER" },
        ],
      },
    ],
  },
  {
    id: "barrel_roll",
    name: "Barrel Roll",
    category: "rotation",
    duration: 16,
    description: "45° rotation combined with 80%→100% scale — dynamic entrance",
    parameters: [
      {
        param: "rotation",
        keyframes: [
          { frame: 0,  value: 45, interpolation: "BEZIER" },
          { frame: 16, value: 0,  interpolation: "BEZIER" },
        ],
      },
      {
        param: "scale",
        keyframes: [
          { frame: 0,  value: 80, interpolation: "BEZIER" },
          { frame: 16, value: 100, interpolation: "BEZIER" },
        ],
      },
    ],
  },
  {
    id: "spin_zoom",
    name: "Spin + Zoom",
    category: "rotation",
    duration: 12,
    description: "45° spin + 150%→100% zoom — high energy combo",
    parameters: [
      {
        param: "rotation",
        keyframes: [
          { frame: 0,  value: 45, interpolation: "EASE_OUT" },
          { frame: 12, value: 0,  interpolation: "EASE_OUT" },
        ],
      },
      {
        param: "scale",
        keyframes: [
          { frame: 0,  value: 150, interpolation: "EASE_OUT" },
          { frame: 12, value: 100, interpolation: "EASE_OUT" },
        ],
      },
    ],
  },
];

// ──────────────────────────────────────────────────────────────────────────
// CATEGORY: CAMERA  (8 presets)
// Simulate real camera movements and lens effects
// ──────────────────────────────────────────────────────────────────────────

const CAMERA_PRESETS: TransitionPreset[] = [
  {
    id: "camera_shake",
    name: "Camera Shake",
    category: "camera",
    duration: 8,
    description: "Rapid position oscillation — impact/shock feel",
    parameters: [
      {
        param: "position",
        keyframes: [
          { frame: 0, value: { xRatio: 0.02,  yRatio: 0.01 },  interpolation: "LINEAR" },
          { frame: 2, value: { xRatio: -0.02, yRatio: -0.01 }, interpolation: "LINEAR" },
          { frame: 4, value: { xRatio: 0.015, yRatio: 0.01 },  interpolation: "LINEAR" },
          { frame: 6, value: { xRatio: -0.01, yRatio: -0.01 }, interpolation: "LINEAR" },
          { frame: 8, value: { xRatio: 0,     yRatio: 0 },     interpolation: "LINEAR" },
        ],
      },
    ],
  },
  {
    id: "camera_roll_in",
    name: "Camera Roll In",
    category: "camera",
    duration: 14,
    description: "5° rotation with 110%→100% zoom — handheld style",
    parameters: [
      {
        param: "rotation",
        keyframes: [
          { frame: 0,  value: 5, interpolation: "BEZIER" },
          { frame: 14, value: 0, interpolation: "BEZIER" },
        ],
      },
      {
        param: "scale",
        keyframes: [
          { frame: 0,  value: 110, interpolation: "BEZIER" },
          { frame: 14, value: 100, interpolation: "BEZIER" },
        ],
      },
    ],
  },
  {
    id: "handheld_in",
    name: "Handheld In",
    category: "camera",
    duration: 16,
    description: "Subtle position drift + 2° rotation — organic imperfection",
    parameters: [
      {
        param: "position",
        keyframes: [
          { frame: 0,  value: { xRatio: 0.02, yRatio: -0.01 }, interpolation: "BEZIER" },
          { frame: 16, value: { xRatio: 0,    yRatio: 0 },     interpolation: "BEZIER" },
        ],
      },
      {
        param: "rotation",
        keyframes: [
          { frame: 0,  value: 2, interpolation: "BEZIER" },
          { frame: 16, value: 0, interpolation: "BEZIER" },
        ],
      },
    ],
  },
  {
    id: "vertigo_zoom",
    name: "Vertigo Zoom",
    category: "camera",
    duration: 16,
    description: "Dolly zoom: zoom in while pulling back (Hitchcock effect)",
    parameters: [
      {
        param: "scale",
        keyframes: [
          { frame: 0,  value: 120, interpolation: "LINEAR" },
          { frame: 16, value: 100, interpolation: "LINEAR" },
        ],
      },
      {
        param: "position",
        keyframes: [
          { frame: 0,  value: { xRatio: 0,    yRatio: -0.05 }, interpolation: "LINEAR" },
          { frame: 16, value: { xRatio: 0,    yRatio: 0 },     interpolation: "LINEAR" },
        ],
      },
    ],
  },
  {
    id: "dolly_in",
    name: "Dolly In",
    category: "camera",
    duration: 20,
    description: "Smooth physical push-in — 108%→100% slow dolly",
    parameters: [
      {
        param: "scale",
        keyframes: [
          { frame: 0,  value: 108, interpolation: "BEZIER" },
          { frame: 20, value: 100, interpolation: "BEZIER" },
        ],
      },
    ],
  },
  {
    id: "crash_pan",
    name: "Crash Pan",
    category: "camera",
    duration: 5,
    description: "Extremely fast pan across screen — 5 frames, linear",
    parameters: [
      {
        param: "position",
        keyframes: [
          { frame: 0, value: { xRatio: 2.0, yRatio: 0 }, interpolation: "LINEAR" },
          { frame: 5, value: { xRatio: 0,   yRatio: 0 }, interpolation: "LINEAR" },
        ],
      },
    ],
  },
  {
    id: "bounce_in",
    name: "Bounce In",
    category: "camera",
    duration: 20,
    description: "Position bounces down then settles — playful landing",
    parameters: [
      {
        param: "position",
        keyframes: [
          { frame: 0,  value: { xRatio: 0, yRatio: -0.15 }, interpolation: "EASE_IN" },
          { frame: 14, value: { xRatio: 0, yRatio: 0.04 },  interpolation: "BEZIER" },
          { frame: 20, value: { xRatio: 0, yRatio: 0 },     interpolation: "BEZIER" },
        ],
      },
    ],
  },
  {
    id: "camera_move",
    name: "Camera Move",
    category: "camera",
    duration: 18,
    description: "Diagonal push with mild rotation — organic camera reframe",
    parameters: [
      {
        param: "position",
        keyframes: [
          { frame: 0,  value: { xRatio: 0.15, yRatio: 0.1 }, interpolation: "BEZIER" },
          { frame: 18, value: { xRatio: 0,    yRatio: 0 },   interpolation: "BEZIER" },
        ],
      },
      {
        param: "rotation",
        keyframes: [
          { frame: 0,  value: 3, interpolation: "BEZIER" },
          { frame: 18, value: 0, interpolation: "BEZIER" },
        ],
      },
    ],
  },
];

// ──────────────────────────────────────────────────────────────────────────
// CATEGORY: SPECIAL  (16 presets — opacity, combos, advanced)
// ──────────────────────────────────────────────────────────────────────────

const SPECIAL_PRESETS: TransitionPreset[] = [
  {
    id: "fade_in",
    name: "Fade In",
    category: "special",
    duration: 16,
    description: "Classic opacity 0→100 smooth fade",
    parameters: [
      {
        param: "opacity",
        keyframes: [
          { frame: 0,  value: 0,   interpolation: "BEZIER" },
          { frame: 16, value: 100, interpolation: "BEZIER" },
        ],
      },
    ],
  },
  {
    id: "fade_out",
    name: "Fade Out",
    category: "special",
    duration: 16,
    description: "Classic opacity 100→0 smooth fade",
    parameters: [
      {
        param: "opacity",
        keyframes: [
          { frame: 0,  value: 100, interpolation: "BEZIER" },
          { frame: 16, value: 0,   interpolation: "BEZIER" },
        ],
      },
    ],
  },
  {
    id: "flash_in",
    name: "Flash In",
    category: "special",
    duration: 4,
    description: "Instant opacity flash 0→100 in 4 frames",
    parameters: [
      {
        param: "opacity",
        keyframes: [
          { frame: 0, value: 0,   interpolation: "LINEAR" },
          { frame: 4, value: 100, interpolation: "LINEAR" },
        ],
      },
    ],
  },
  {
    id: "flash_cut",
    name: "Flash Cut",
    category: "special",
    duration: 6,
    description: "Zoom + flash: scale 120→100 + opacity 0→100",
    parameters: [
      {
        param: "scale",
        keyframes: [
          { frame: 0, value: 120, interpolation: "EASE_OUT" },
          { frame: 6, value: 100, interpolation: "EASE_OUT" },
        ],
      },
      {
        param: "opacity",
        keyframes: [
          { frame: 0, value: 0,   interpolation: "LINEAR" },
          { frame: 6, value: 100, interpolation: "LINEAR" },
        ],
      },
    ],
  },
  {
    id: "cross_zoom",
    name: "Cross Zoom",
    category: "special",
    duration: 14,
    description: "Scale + 10° rotation + mild opacity — cinematic combo",
    parameters: [
      {
        param: "scale",
        keyframes: [
          { frame: 0,  value: 130, interpolation: "BEZIER" },
          { frame: 14, value: 100, interpolation: "BEZIER" },
        ],
      },
      {
        param: "rotation",
        keyframes: [
          { frame: 0,  value: 10, interpolation: "BEZIER" },
          { frame: 14, value: 0,  interpolation: "BEZIER" },
        ],
      },
    ],
  },
  {
    id: "warp_in",
    name: "Warp In",
    category: "special",
    duration: 14,
    description: "Scale from 0 + 180° rotation — dramatic warp entrance",
    parameters: [
      {
        param: "scale",
        keyframes: [
          { frame: 0,  value: 0,   interpolation: "EASE_OUT" },
          { frame: 14, value: 100, interpolation: "EASE_OUT" },
        ],
      },
      {
        param: "rotation",
        keyframes: [
          { frame: 0,  value: 180, interpolation: "EASE_OUT" },
          { frame: 14, value: 0,   interpolation: "EASE_OUT" },
        ],
      },
    ],
  },
  {
    id: "impact_punch",
    name: "Impact Punch",
    category: "special",
    duration: 8,
    description: "Extreme zoom snap + camera shake combo",
    parameters: [
      {
        param: "scale",
        keyframes: [
          { frame: 0, value: 160, interpolation: "EASE_OUT" },
          { frame: 8, value: 100, interpolation: "EASE_OUT" },
        ],
      },
      {
        param: "position",
        keyframes: [
          { frame: 0, value: { xRatio: 0.015, yRatio: -0.01 }, interpolation: "LINEAR" },
          { frame: 3, value: { xRatio: -0.01, yRatio: 0.01 },  interpolation: "LINEAR" },
          { frame: 8, value: { xRatio: 0,     yRatio: 0 },     interpolation: "LINEAR" },
        ],
      },
    ],
  },
  {
    id: "glitch_in",
    name: "Glitch In",
    category: "special",
    duration: 8,
    description: "Step-function scale jumps — digital glitch effect",
    parameters: [
      {
        param: "scale",
        keyframes: [
          { frame: 0, value: 130, interpolation: "HOLD" },
          { frame: 2, value: 90,  interpolation: "HOLD" },
          { frame: 4, value: 115, interpolation: "HOLD" },
          { frame: 6, value: 95,  interpolation: "HOLD" },
          { frame: 8, value: 100, interpolation: "BEZIER" },
        ],
      },
    ],
  },
  {
    id: "lens_flare_zoom",
    name: "Lens Flare Zoom",
    category: "special",
    duration: 10,
    description: "Opacity 0→100 + scale 110→100 — simulate lens reveal",
    parameters: [
      {
        param: "opacity",
        keyframes: [
          { frame: 0,  value: 0,   interpolation: "EASE_OUT" },
          { frame: 10, value: 100, interpolation: "EASE_OUT" },
        ],
      },
      {
        param: "scale",
        keyframes: [
          { frame: 0,  value: 110, interpolation: "BEZIER" },
          { frame: 10, value: 100, interpolation: "BEZIER" },
        ],
      },
    ],
  },
  {
    id: "spring_pop",
    name: "Spring Pop",
    category: "special",
    duration: 20,
    description: "Overshooting spring: 0→120→95→100 — bouncy reveal",
    parameters: [
      {
        param: "scale",
        keyframes: [
          { frame: 0,  value: 0,   interpolation: "EASE_OUT" },
          { frame: 12, value: 120, interpolation: "BEZIER"  },
          { frame: 16, value: 95,  interpolation: "BEZIER"  },
          { frame: 20, value: 100, interpolation: "BEZIER"  },
        ],
      },
    ],
  },
  {
    id: "cinematic_push_in",
    name: "Cinematic Push In",
    category: "special",
    duration: 24,
    description: "Slow push-in: scale + fade + position — full cinematic reveal",
    parameters: [
      {
        param: "scale",
        keyframes: [
          { frame: 0,  value: 112, interpolation: "BEZIER" },
          { frame: 24, value: 100, interpolation: "BEZIER" },
        ],
      },
      {
        param: "opacity",
        keyframes: [
          { frame: 0,  value: 0,   interpolation: "BEZIER" },
          { frame: 24, value: 100, interpolation: "BEZIER" },
        ],
      },
      {
        param: "position",
        keyframes: [
          { frame: 0,  value: { xRatio: 0, yRatio: 0.03 }, interpolation: "BEZIER" },
          { frame: 24, value: { xRatio: 0, yRatio: 0 },    interpolation: "BEZIER" },
        ],
      },
    ],
  },
  {
    id: "tv_static_in",
    name: "TV Static In",
    category: "special",
    duration: 8,
    description: "Rapid opacity flicker then settle — vintage TV on effect",
    parameters: [
      {
        param: "opacity",
        keyframes: [
          { frame: 0, value: 0,   interpolation: "HOLD" },
          { frame: 2, value: 100, interpolation: "HOLD" },
          { frame: 3, value: 0,   interpolation: "HOLD" },
          { frame: 5, value: 100, interpolation: "HOLD" },
          { frame: 6, value: 40,  interpolation: "HOLD" },
          { frame: 8, value: 100, interpolation: "BEZIER" },
        ],
      },
    ],
  },
  {
    id: "smooth_fade_zoom",
    name: "Smooth Fade Zoom",
    category: "special",
    duration: 18,
    description: "Opacity 0→100 + micro zoom — polished broadcast standard",
    parameters: [
      {
        param: "opacity",
        keyframes: [
          { frame: 0,  value: 0,   interpolation: "BEZIER" },
          { frame: 18, value: 100, interpolation: "BEZIER" },
        ],
      },
      {
        param: "scale",
        keyframes: [
          { frame: 0,  value: 105, interpolation: "BEZIER" },
          { frame: 18, value: 100, interpolation: "BEZIER" },
        ],
      },
    ],
  },
  {
    id: "warp_speed",
    name: "Warp Speed",
    category: "special",
    duration: 6,
    description: "Scale from near-0 to 100 + position snap — sci-fi warp",
    parameters: [
      {
        param: "scale",
        keyframes: [
          { frame: 0, value: 5,   interpolation: "EASE_OUT" },
          { frame: 6, value: 100, interpolation: "EASE_OUT" },
        ],
      },
    ],
  },
  {
    id: "zoom_fade",
    name: "Zoom Fade",
    category: "special",
    duration: 14,
    description: "Scale 120→100 + opacity 40→100 — warm zoom reveal",
    parameters: [
      {
        param: "scale",
        keyframes: [
          { frame: 0,  value: 120, interpolation: "BEZIER" },
          { frame: 14, value: 100, interpolation: "BEZIER" },
        ],
      },
      {
        param: "opacity",
        keyframes: [
          { frame: 0,  value: 40,  interpolation: "BEZIER" },
          { frame: 14, value: 100, interpolation: "BEZIER" },
        ],
      },
    ],
  },
  {
    id: "rotation_fade",
    name: "Rotation Fade",
    category: "special",
    duration: 16,
    description: "15° rotation + opacity 0→100 — page-turn feel",
    parameters: [
      {
        param: "rotation",
        keyframes: [
          { frame: 0,  value: 15, interpolation: "BEZIER" },
          { frame: 16, value: 0,  interpolation: "BEZIER" },
        ],
      },
      {
        param: "opacity",
        keyframes: [
          { frame: 0,  value: 0,   interpolation: "BEZIER" },
          { frame: 16, value: 100, interpolation: "BEZIER" },
        ],
      },
    ],
  },
];

// ──────────────────────────────────────────────────────────────────────────
// COMBINED EXPORT
// ──────────────────────────────────────────────────────────────────────────

export const ALL_PRESETS: TransitionPreset[] = [
  ...ZOOM_PRESETS,      // 15
  ...SLIDE_PRESETS,     // 8
  ...PUSH_PRESETS,      // 8
  ...WHIP_PRESETS,      // 6
  ...ROTATION_PRESETS,  // 8
  ...CAMERA_PRESETS,    // 8
  ...SPECIAL_PRESETS,   // 16
];

// Total: 69 professional transitions
