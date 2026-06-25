(function() {
  "use strict";
  const ZOOM_PRESETS = [
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
            { frame: 12, value: 100, interpolation: "BEZIER" }
          ]
        }
      ]
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
            { frame: 12, value: 100, interpolation: "BEZIER" }
          ]
        }
      ]
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
            { frame: 8, value: 100, interpolation: "EASE_OUT" }
          ]
        }
      ]
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
            { frame: 8, value: 100, interpolation: "EASE_OUT" }
          ]
        }
      ]
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
            { frame: 20, value: 100, interpolation: "BEZIER" }
          ]
        }
      ]
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
            { frame: 20, value: 100, interpolation: "BEZIER" }
          ]
        }
      ]
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
            { frame: 16, value: 100, interpolation: "BEZIER" }
          ]
        },
        {
          param: "position",
          keyframes: [
            { frame: 0, value: { xRatio: 0, yRatio: 0.04 }, interpolation: "BEZIER" },
            { frame: 16, value: { xRatio: 0, yRatio: 0 }, interpolation: "BEZIER" }
          ]
        }
      ]
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
            { frame: 6, value: 100, interpolation: "EASE_OUT" }
          ]
        }
      ]
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
            { frame: 6, value: 140, interpolation: "EASE_IN" }
          ]
        }
      ]
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
            { frame: 0, value: 0, interpolation: "BEZIER" },
            { frame: 14, value: 112, interpolation: "BEZIER" },
            { frame: 18, value: 100, interpolation: "BEZIER" }
          ]
        }
      ]
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
            { frame: 0, value: 103, interpolation: "BEZIER" },
            { frame: 12, value: 100, interpolation: "BEZIER" }
          ]
        }
      ]
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
            { frame: 4, value: 100, interpolation: "EASE_OUT" }
          ]
        }
      ]
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
            { frame: 0, value: 110, interpolation: "LINEAR" },
            { frame: 48, value: 100, interpolation: "LINEAR" }
          ]
        },
        {
          param: "position",
          keyframes: [
            { frame: 0, value: { xRatio: 0.03, yRatio: 0.03 }, interpolation: "LINEAR" },
            { frame: 48, value: { xRatio: 0, yRatio: 0 }, interpolation: "LINEAR" }
          ]
        }
      ]
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
            { frame: 8, value: 100, interpolation: "EASE_OUT" }
          ]
        }
      ]
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
            { frame: 3, value: 100, interpolation: "LINEAR" }
          ]
        }
      ]
    }
  ];
  const SLIDE_PRESETS = [
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
            { frame: 0, value: { xRatio: 1, yRatio: 0 }, interpolation: "BEZIER" },
            { frame: 12, value: { xRatio: 0, yRatio: 0 }, interpolation: "BEZIER" }
          ]
        }
      ]
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
            { frame: 0, value: { xRatio: -1, yRatio: 0 }, interpolation: "BEZIER" },
            { frame: 12, value: { xRatio: 0, yRatio: 0 }, interpolation: "BEZIER" }
          ]
        }
      ]
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
            { frame: 0, value: { xRatio: 0, yRatio: 1 }, interpolation: "BEZIER" },
            { frame: 12, value: { xRatio: 0, yRatio: 0 }, interpolation: "BEZIER" }
          ]
        }
      ]
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
            { frame: 0, value: { xRatio: 0, yRatio: -1 }, interpolation: "BEZIER" },
            { frame: 12, value: { xRatio: 0, yRatio: 0 }, interpolation: "BEZIER" }
          ]
        }
      ]
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
            { frame: 0, value: { xRatio: 0.3, yRatio: 0 }, interpolation: "BEZIER" },
            { frame: 16, value: { xRatio: 0, yRatio: 0 }, interpolation: "BEZIER" }
          ]
        }
      ]
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
            { frame: 0, value: { xRatio: -0.3, yRatio: 0 }, interpolation: "BEZIER" },
            { frame: 16, value: { xRatio: 0, yRatio: 0 }, interpolation: "BEZIER" }
          ]
        }
      ]
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
            { frame: 0, value: { xRatio: 0.05, yRatio: 0 }, interpolation: "BEZIER" },
            { frame: 24, value: { xRatio: 0, yRatio: 0 }, interpolation: "BEZIER" }
          ]
        }
      ]
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
            { frame: 0, value: { xRatio: 0, yRatio: 1 }, interpolation: "EASE_OUT" },
            { frame: 14, value: { xRatio: 0, yRatio: 0 }, interpolation: "EASE_OUT" }
          ]
        },
        {
          param: "scale",
          keyframes: [
            { frame: 0, value: 105, interpolation: "BEZIER" },
            { frame: 14, value: 100, interpolation: "BEZIER" }
          ]
        }
      ]
    }
  ];
  const PUSH_PRESETS = [
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
            { frame: 0, value: { xRatio: 1, yRatio: 0 }, interpolation: "BEZIER" },
            { frame: 12, value: { xRatio: 0, yRatio: 0 }, interpolation: "BEZIER" }
          ]
        }
      ]
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
            { frame: 0, value: { xRatio: -1, yRatio: 0 }, interpolation: "BEZIER" },
            { frame: 12, value: { xRatio: 0, yRatio: 0 }, interpolation: "BEZIER" }
          ]
        }
      ]
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
            { frame: 0, value: { xRatio: 0, yRatio: 1 }, interpolation: "BEZIER" },
            { frame: 12, value: { xRatio: 0, yRatio: 0 }, interpolation: "BEZIER" }
          ]
        }
      ]
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
            { frame: 0, value: { xRatio: 0, yRatio: -1 }, interpolation: "BEZIER" },
            { frame: 12, value: { xRatio: 0, yRatio: 0 }, interpolation: "BEZIER" }
          ]
        }
      ]
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
            { frame: 0, value: { xRatio: 1, yRatio: 0 }, interpolation: "LINEAR" },
            { frame: 6, value: { xRatio: 0, yRatio: 0 }, interpolation: "LINEAR" }
          ]
        }
      ]
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
            { frame: 0, value: { xRatio: -1, yRatio: 0 }, interpolation: "LINEAR" },
            { frame: 6, value: { xRatio: 0, yRatio: 0 }, interpolation: "LINEAR" }
          ]
        }
      ]
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
            { frame: 0, value: { xRatio: 1, yRatio: 0 }, interpolation: "BEZIER" },
            { frame: 12, value: { xRatio: 0, yRatio: 0 }, interpolation: "BEZIER" }
          ]
        },
        {
          param: "scale",
          keyframes: [
            { frame: 0, value: 110, interpolation: "BEZIER" },
            { frame: 12, value: 100, interpolation: "BEZIER" }
          ]
        }
      ]
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
            { frame: 0, value: { xRatio: 0.7, yRatio: 0.7 }, interpolation: "BEZIER" },
            { frame: 14, value: { xRatio: 0, yRatio: 0 }, interpolation: "BEZIER" }
          ]
        }
      ]
    }
  ];
  const WHIP_PRESETS = [
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
            { frame: 6, value: { xRatio: 0, yRatio: 0 }, interpolation: "EASE_OUT" }
          ]
        },
        {
          param: "scale",
          keyframes: [
            { frame: 0, value: 95, interpolation: "BEZIER" },
            { frame: 6, value: 100, interpolation: "BEZIER" }
          ]
        }
      ]
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
            { frame: 6, value: { xRatio: 0, yRatio: 0 }, interpolation: "EASE_OUT" }
          ]
        },
        {
          param: "scale",
          keyframes: [
            { frame: 0, value: 95, interpolation: "BEZIER" },
            { frame: 6, value: 100, interpolation: "BEZIER" }
          ]
        }
      ]
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
            { frame: 6, value: { xRatio: 0, yRatio: 0 }, interpolation: "EASE_OUT" }
          ]
        }
      ]
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
            { frame: 6, value: { xRatio: 0, yRatio: 0 }, interpolation: "EASE_OUT" }
          ]
        }
      ]
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
            { frame: 0, value: { xRatio: 1, yRatio: 0 }, interpolation: "EASE_OUT" },
            { frame: 10, value: { xRatio: 0, yRatio: 0 }, interpolation: "EASE_OUT" }
          ]
        }
      ]
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
            { frame: 0, value: { xRatio: -1, yRatio: 0 }, interpolation: "EASE_OUT" },
            { frame: 10, value: { xRatio: 0, yRatio: 0 }, interpolation: "EASE_OUT" }
          ]
        }
      ]
    }
  ];
  const ROTATION_PRESETS = [
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
            { frame: 0, value: 90, interpolation: "BEZIER" },
            { frame: 14, value: 0, interpolation: "BEZIER" }
          ]
        }
      ]
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
            { frame: 0, value: -90, interpolation: "BEZIER" },
            { frame: 14, value: 0, interpolation: "BEZIER" }
          ]
        }
      ]
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
            { frame: 0, value: 360, interpolation: "EASE_OUT" },
            { frame: 16, value: 0, interpolation: "EASE_OUT" }
          ]
        },
        {
          param: "scale",
          keyframes: [
            { frame: 0, value: 130, interpolation: "BEZIER" },
            { frame: 16, value: 100, interpolation: "BEZIER" }
          ]
        }
      ]
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
            { frame: 0, value: 12, interpolation: "BEZIER" },
            { frame: 12, value: 0, interpolation: "BEZIER" }
          ]
        }
      ]
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
            { frame: 0, value: -12, interpolation: "BEZIER" },
            { frame: 12, value: 0, interpolation: "BEZIER" }
          ]
        }
      ]
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
            { frame: 0, value: 3, interpolation: "BEZIER" },
            { frame: 16, value: 0, interpolation: "BEZIER" }
          ]
        }
      ]
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
            { frame: 0, value: 45, interpolation: "BEZIER" },
            { frame: 16, value: 0, interpolation: "BEZIER" }
          ]
        },
        {
          param: "scale",
          keyframes: [
            { frame: 0, value: 80, interpolation: "BEZIER" },
            { frame: 16, value: 100, interpolation: "BEZIER" }
          ]
        }
      ]
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
            { frame: 0, value: 45, interpolation: "EASE_OUT" },
            { frame: 12, value: 0, interpolation: "EASE_OUT" }
          ]
        },
        {
          param: "scale",
          keyframes: [
            { frame: 0, value: 150, interpolation: "EASE_OUT" },
            { frame: 12, value: 100, interpolation: "EASE_OUT" }
          ]
        }
      ]
    }
  ];
  const CAMERA_PRESETS = [
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
            { frame: 0, value: { xRatio: 0.02, yRatio: 0.01 }, interpolation: "LINEAR" },
            { frame: 2, value: { xRatio: -0.02, yRatio: -0.01 }, interpolation: "LINEAR" },
            { frame: 4, value: { xRatio: 0.015, yRatio: 0.01 }, interpolation: "LINEAR" },
            { frame: 6, value: { xRatio: -0.01, yRatio: -0.01 }, interpolation: "LINEAR" },
            { frame: 8, value: { xRatio: 0, yRatio: 0 }, interpolation: "LINEAR" }
          ]
        }
      ]
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
            { frame: 0, value: 5, interpolation: "BEZIER" },
            { frame: 14, value: 0, interpolation: "BEZIER" }
          ]
        },
        {
          param: "scale",
          keyframes: [
            { frame: 0, value: 110, interpolation: "BEZIER" },
            { frame: 14, value: 100, interpolation: "BEZIER" }
          ]
        }
      ]
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
            { frame: 0, value: { xRatio: 0.02, yRatio: -0.01 }, interpolation: "BEZIER" },
            { frame: 16, value: { xRatio: 0, yRatio: 0 }, interpolation: "BEZIER" }
          ]
        },
        {
          param: "rotation",
          keyframes: [
            { frame: 0, value: 2, interpolation: "BEZIER" },
            { frame: 16, value: 0, interpolation: "BEZIER" }
          ]
        }
      ]
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
            { frame: 0, value: 120, interpolation: "LINEAR" },
            { frame: 16, value: 100, interpolation: "LINEAR" }
          ]
        },
        {
          param: "position",
          keyframes: [
            { frame: 0, value: { xRatio: 0, yRatio: -0.05 }, interpolation: "LINEAR" },
            { frame: 16, value: { xRatio: 0, yRatio: 0 }, interpolation: "LINEAR" }
          ]
        }
      ]
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
            { frame: 0, value: 108, interpolation: "BEZIER" },
            { frame: 20, value: 100, interpolation: "BEZIER" }
          ]
        }
      ]
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
            { frame: 0, value: { xRatio: 2, yRatio: 0 }, interpolation: "LINEAR" },
            { frame: 5, value: { xRatio: 0, yRatio: 0 }, interpolation: "LINEAR" }
          ]
        }
      ]
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
            { frame: 0, value: { xRatio: 0, yRatio: -0.15 }, interpolation: "EASE_IN" },
            { frame: 14, value: { xRatio: 0, yRatio: 0.04 }, interpolation: "BEZIER" },
            { frame: 20, value: { xRatio: 0, yRatio: 0 }, interpolation: "BEZIER" }
          ]
        }
      ]
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
            { frame: 0, value: { xRatio: 0.15, yRatio: 0.1 }, interpolation: "BEZIER" },
            { frame: 18, value: { xRatio: 0, yRatio: 0 }, interpolation: "BEZIER" }
          ]
        },
        {
          param: "rotation",
          keyframes: [
            { frame: 0, value: 3, interpolation: "BEZIER" },
            { frame: 18, value: 0, interpolation: "BEZIER" }
          ]
        }
      ]
    }
  ];
  const SPECIAL_PRESETS = [
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
            { frame: 0, value: 0, interpolation: "BEZIER" },
            { frame: 16, value: 100, interpolation: "BEZIER" }
          ]
        }
      ]
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
            { frame: 0, value: 100, interpolation: "BEZIER" },
            { frame: 16, value: 0, interpolation: "BEZIER" }
          ]
        }
      ]
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
            { frame: 0, value: 0, interpolation: "LINEAR" },
            { frame: 4, value: 100, interpolation: "LINEAR" }
          ]
        }
      ]
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
            { frame: 6, value: 100, interpolation: "EASE_OUT" }
          ]
        },
        {
          param: "opacity",
          keyframes: [
            { frame: 0, value: 0, interpolation: "LINEAR" },
            { frame: 6, value: 100, interpolation: "LINEAR" }
          ]
        }
      ]
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
            { frame: 0, value: 130, interpolation: "BEZIER" },
            { frame: 14, value: 100, interpolation: "BEZIER" }
          ]
        },
        {
          param: "rotation",
          keyframes: [
            { frame: 0, value: 10, interpolation: "BEZIER" },
            { frame: 14, value: 0, interpolation: "BEZIER" }
          ]
        }
      ]
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
            { frame: 0, value: 0, interpolation: "EASE_OUT" },
            { frame: 14, value: 100, interpolation: "EASE_OUT" }
          ]
        },
        {
          param: "rotation",
          keyframes: [
            { frame: 0, value: 180, interpolation: "EASE_OUT" },
            { frame: 14, value: 0, interpolation: "EASE_OUT" }
          ]
        }
      ]
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
            { frame: 8, value: 100, interpolation: "EASE_OUT" }
          ]
        },
        {
          param: "position",
          keyframes: [
            { frame: 0, value: { xRatio: 0.015, yRatio: -0.01 }, interpolation: "LINEAR" },
            { frame: 3, value: { xRatio: -0.01, yRatio: 0.01 }, interpolation: "LINEAR" },
            { frame: 8, value: { xRatio: 0, yRatio: 0 }, interpolation: "LINEAR" }
          ]
        }
      ]
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
            { frame: 2, value: 90, interpolation: "HOLD" },
            { frame: 4, value: 115, interpolation: "HOLD" },
            { frame: 6, value: 95, interpolation: "HOLD" },
            { frame: 8, value: 100, interpolation: "BEZIER" }
          ]
        }
      ]
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
            { frame: 0, value: 0, interpolation: "EASE_OUT" },
            { frame: 10, value: 100, interpolation: "EASE_OUT" }
          ]
        },
        {
          param: "scale",
          keyframes: [
            { frame: 0, value: 110, interpolation: "BEZIER" },
            { frame: 10, value: 100, interpolation: "BEZIER" }
          ]
        }
      ]
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
            { frame: 0, value: 0, interpolation: "EASE_OUT" },
            { frame: 12, value: 120, interpolation: "BEZIER" },
            { frame: 16, value: 95, interpolation: "BEZIER" },
            { frame: 20, value: 100, interpolation: "BEZIER" }
          ]
        }
      ]
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
            { frame: 0, value: 112, interpolation: "BEZIER" },
            { frame: 24, value: 100, interpolation: "BEZIER" }
          ]
        },
        {
          param: "opacity",
          keyframes: [
            { frame: 0, value: 0, interpolation: "BEZIER" },
            { frame: 24, value: 100, interpolation: "BEZIER" }
          ]
        },
        {
          param: "position",
          keyframes: [
            { frame: 0, value: { xRatio: 0, yRatio: 0.03 }, interpolation: "BEZIER" },
            { frame: 24, value: { xRatio: 0, yRatio: 0 }, interpolation: "BEZIER" }
          ]
        }
      ]
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
            { frame: 0, value: 0, interpolation: "HOLD" },
            { frame: 2, value: 100, interpolation: "HOLD" },
            { frame: 3, value: 0, interpolation: "HOLD" },
            { frame: 5, value: 100, interpolation: "HOLD" },
            { frame: 6, value: 40, interpolation: "HOLD" },
            { frame: 8, value: 100, interpolation: "BEZIER" }
          ]
        }
      ]
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
            { frame: 0, value: 0, interpolation: "BEZIER" },
            { frame: 18, value: 100, interpolation: "BEZIER" }
          ]
        },
        {
          param: "scale",
          keyframes: [
            { frame: 0, value: 105, interpolation: "BEZIER" },
            { frame: 18, value: 100, interpolation: "BEZIER" }
          ]
        }
      ]
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
            { frame: 0, value: 5, interpolation: "EASE_OUT" },
            { frame: 6, value: 100, interpolation: "EASE_OUT" }
          ]
        }
      ]
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
            { frame: 0, value: 120, interpolation: "BEZIER" },
            { frame: 14, value: 100, interpolation: "BEZIER" }
          ]
        },
        {
          param: "opacity",
          keyframes: [
            { frame: 0, value: 40, interpolation: "BEZIER" },
            { frame: 14, value: 100, interpolation: "BEZIER" }
          ]
        }
      ]
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
            { frame: 0, value: 15, interpolation: "BEZIER" },
            { frame: 16, value: 0, interpolation: "BEZIER" }
          ]
        },
        {
          param: "opacity",
          keyframes: [
            { frame: 0, value: 0, interpolation: "BEZIER" },
            { frame: 16, value: 100, interpolation: "BEZIER" }
          ]
        }
      ]
    }
  ];
  const ALL_PRESETS = [
    ...ZOOM_PRESETS,
    // 15
    ...SLIDE_PRESETS,
    // 8
    ...PUSH_PRESETS,
    // 8
    ...WHIP_PRESETS,
    // 6
    ...ROTATION_PRESETS,
    // 8
    ...CAMERA_PRESETS,
    // 8
    ...SPECIAL_PRESETS
    // 16
  ];
  class PresetRegistry {
    constructor() {
      this._presets = new Map(ALL_PRESETS.map((p) => [p.id, p]));
    }
    getAll() {
      return Array.from(this._presets.values());
    }
    getById(id) {
      return this._presets.get(id);
    }
    getByCategory(category) {
      return this.getAll().filter((p) => p.category === category);
    }
    getCategories() {
      const seen = /* @__PURE__ */ new Set();
      for (const p of this._presets.values()) seen.add(p.category);
      return Array.from(seen);
    }
    count() {
      return this._presets.size;
    }
  }
  const registry = new PresetRegistry();
  const CATEGORY_LABELS = {
    zoom: "Zoom",
    slide: "Slide",
    push: "Push",
    whip: "Whip",
    rotation: "Rotation",
    camera: "Camera",
    special: "Special"
  };
  const ppro$3 = require("premierepro");
  function parseFrameRate(timebase) {
    const parts = timebase.split("/");
    if (parts.length !== 2) return 24;
    const num = parseFloat(parts[0]);
    const den = parseFloat(parts[1]);
    if (den === 0) return 24;
    return num / den;
  }
  function framesToTickTime(frame, timebase) {
    return ppro$3.TickTime.createWithFrameAndFrameRate(frame, timebase);
  }
  function tickTimeToFrames(time, timebase) {
    const fps = parseFrameRate(timebase);
    return Math.round(time.seconds * fps);
  }
  function buildLocalKfTime(clipInPoint, frameOffset, timebase) {
    const offsetTime = framesToTickTime(frameOffset, timebase);
    return clipInPoint.add(offsetTime);
  }
  const PREFIX = "[QuickTransitions]";
  const Logger = {
    info: (msg, ...args) => console.log(`${PREFIX} ${msg}`, ...args),
    warn: (msg, ...args) => console.warn(`${PREFIX} WARN: ${msg}`, ...args),
    error: (msg, ...args) => console.error(`${PREFIX} ERROR: ${msg}`, ...args),
    debug: (msg, ...args) => console.debug(`${PREFIX} DBG: ${msg}`, ...args)
  };
  const ppro$2 = require("premierepro");
  async function getSelectedVideoClips() {
    const project = await ppro$2.Project.getActiveProject();
    if (!project) throw new Error("No active project");
    const sequence = await project.getActiveSequence();
    if (!sequence) throw new Error("No active sequence");
    const selection = await sequence.getSelection();
    const trackItems = await selection.getTrackItems();
    const videoClips = [];
    for (const item of trackItems) {
      if ("getComponentChain" in item && typeof item.getComponentChain === "function") {
        videoClips.push(item);
      }
    }
    return videoClips;
  }
  const MATCH_NAMES = {
    MOTION: ["AE.ADBE Motion", "ADBE Motion"],
    OPACITY: ["AE.ADBE Opacity", "ADBE Opacity"]
  };
  const MOTION_PARAM = {
    POSITION: 0,
    // PointF — pixels from top-left, center ≈ {seqW/2, seqH/2}
    SCALE: 1,
    // number — 100 = 100%
    SCALE_WIDTH: 2,
    // number (when uniform scale is unlinked)
    SCALE_HEIGHT: 3,
    ROTATION: 4,
    // number — degrees, positive = CW
    ANCHOR: 5
    // PointF
  };
  const OPACITY_PARAM = {
    OPACITY: 0
    // number 0–100
  };
  async function findComponent(clip, candidateMatchNames) {
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
  async function getMotionComponent(clip) {
    return findComponent(clip, MATCH_NAMES.MOTION);
  }
  async function getOpacityComponent(clip) {
    return findComponent(clip, MATCH_NAMES.OPACITY);
  }
  async function getMotionParam(clip, paramIndex) {
    const motion = await getMotionComponent(clip);
    if (!motion) return null;
    return motion.getParam(paramIndex);
  }
  async function getOpacityParam(clip) {
    const opacityComp = await getOpacityComponent(clip);
    if (!opacityComp) return null;
    return opacityComp.getParam(OPACITY_PARAM.OPACITY);
  }
  const ppro$1 = require("premierepro");
  function getInterpConstant(mode) {
    const C = ppro$1.Constants;
    switch (mode) {
      case "LINEAR":
        return C.INTERPOLATION_MODE_LINEAR;
      case "HOLD":
        return C.INTERPOLATION_MODE_HOLD;
      case "EASE_IN":
        return C.INTERPOLATION_MODE_EASE_IN ?? C.INTERPOLATION_MODE_BEZIER;
      case "EASE_OUT":
        return C.INTERPOLATION_MODE_EASE_OUT ?? C.INTERPOLATION_MODE_BEZIER;
      case "BEZIER":
      default:
        return C.INTERPOLATION_MODE_BEZIER;
    }
  }
  function buildParamKeyframeActions(param, specs) {
    const actions = [];
    actions.push(param.createSetTimeVaryingAction(true));
    for (const spec of specs) {
      const kf = param.createKeyframe(spec.value);
      kf.position = spec.time;
      actions.push(param.createAddKeyframeAction(kf));
      actions.push(
        param.createSetInterpolationAtKeyframeAction(
          spec.time,
          getInterpConstant(spec.interpolation),
          false
          // Update UI only after entire transaction commits
        )
      );
    }
    return actions;
  }
  async function commitActions(actions, undoLabel) {
    if (actions.length === 0) return;
    const project = await ppro$1.Project.getActiveProject();
    await project.lockedAccess(() => {
      project.executeTransaction((tx) => {
        for (const action of actions) {
          tx.executeAction(action);
        }
      }, undoLabel);
    });
  }
  const ppro = require("premierepro");
  async function detectPositionCoordSystem(posParam, sampleTime) {
    try {
      const raw = await posParam.getValueAtTime(sampleTime);
      if (raw && typeof raw.x === "number") {
        return raw.x > 2 ? "pixels" : "normalized";
      }
    } catch {
    }
    return "pixels";
  }
  function resolvePositionValue(offset, seqW, seqH, coordSystem) {
    if (coordSystem === "pixels") {
      return {
        x: seqW / 2 + offset.xRatio * seqW,
        y: seqH / 2 + offset.yRatio * seqH
      };
    }
    return {
      x: 0.5 + offset.xRatio * 0.5,
      y: 0.5 + offset.yRatio * 0.5
    };
  }
  async function resolveParam(clip, paramType) {
    switch (paramType) {
      case "scale":
        return getMotionParam(clip, MOTION_PARAM.SCALE);
      case "position":
        return getMotionParam(clip, MOTION_PARAM.POSITION);
      case "rotation":
        return getMotionParam(clip, MOTION_PARAM.ROTATION);
      case "opacity":
        return getOpacityParam(clip);
      default:
        return null;
    }
  }
  function reverseKeyframes(keyframes, targetDuration) {
    const reversed = [...keyframes].reverse();
    const n = reversed.length;
    return reversed.map((kf, i) => ({
      ...kf,
      frame: n > 1 ? Math.round(i / (n - 1) * targetDuration) : 0
    }));
  }
  function scaleKeyframes(keyframes, presetDuration, targetDuration) {
    if (presetDuration === 0) return keyframes;
    return keyframes.map((kf) => ({
      ...kf,
      frame: Math.round(kf.frame / presetDuration * targetDuration)
    }));
  }
  async function applyTransition(clip, preset, options) {
    try {
      const project = await ppro.Project.getActiveProject();
      if (!project) return { success: false, message: "No active project" };
      const sequence = await project.getActiveSequence();
      if (!sequence) return { success: false, message: "No active sequence" };
      const timebase = await sequence.getTimebase();
      const seqSettings = await sequence.getSettings();
      const seqW = seqSettings.videoFrameWidth;
      const seqH = seqSettings.videoFrameHeight;
      const fps = parseFrameRate(timebase);
      const clipInPoint = await clip.getInPoint();
      const clipDuration = await clip.getDuration();
      const clipFrames = tickTimeToFrames(clipDuration, timebase);
      const transitionFrames = options.durationFrames !== null ? options.durationFrames : Math.round(preset.duration * fps / 24);
      if (transitionFrames >= clipFrames) {
        return {
          success: false,
          message: `Clip too short (${clipFrames}f) for ${transitionFrames}f transition`
        };
      }
      const windowStartFrame = options.placement === "beginning" ? 0 : clipFrames - transitionFrames;
      const posParam = await getMotionParam(clip, MOTION_PARAM.POSITION);
      let coordSystem = "pixels";
      if (posParam) {
        const sampleTime = buildLocalKfTime(clipInPoint, windowStartFrame, timebase);
        coordSystem = await detectPositionCoordSystem(posParam, sampleTime);
      }
      const allActions = [];
      for (const paramAnim of preset.parameters) {
        const param = await resolveParam(clip, paramAnim.param);
        if (!param) {
          Logger.warn(`Param "${paramAnim.param}" not found on clip — skipping`);
          continue;
        }
        let kfDefs = paramAnim.keyframes;
        if (options.placement === "end") {
          kfDefs = reverseKeyframes(kfDefs, preset.duration);
        }
        kfDefs = scaleKeyframes(kfDefs, preset.duration, transitionFrames);
        const specs = kfDefs.map((kf) => {
          const absoluteFrame = windowStartFrame + kf.frame;
          const time = buildLocalKfTime(clipInPoint, absoluteFrame, timebase);
          const value = typeof kf.value === "number" ? kf.value : resolvePositionValue(kf.value, seqW, seqH, coordSystem);
          return { time, value, interpolation: kf.interpolation };
        });
        const paramActions = buildParamKeyframeActions(param, specs);
        allActions.push(...paramActions);
      }
      if (allActions.length === 0) {
        return { success: false, message: "No animatable parameters found on clip" };
      }
      await commitActions(
        allActions,
        `Quick Transitions: ${preset.name} (${options.placement})`
      );
      Logger.info(
        `Applied "${preset.name}" at ${options.placement} — ${allActions.length} actions`
      );
      return {
        success: true,
        message: `Applied "${preset.name}" at ${options.placement}`
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      Logger.error("applyTransition failed:", msg);
      return { success: false, message: msg };
    }
  }
  const state = {
    selectedCategory: "zoom",
    selectedPreset: null,
    placement: "beginning",
    durationFrames: 12,
    clipName: null,
    isApplying: false
  };
  const el = {
    categoryNav: () => document.getElementById("category-nav"),
    transitionGrid: () => document.getElementById("transition-grid"),
    clipStatus: () => document.getElementById("clip-status"),
    clipNameLabel: () => document.getElementById("clip-name-label"),
    presetCount: () => document.getElementById("preset-count"),
    btnBeginning: () => document.getElementById("btn-beginning"),
    btnEnd: () => document.getElementById("btn-end"),
    durationSlider: () => document.getElementById("duration-slider"),
    durationFrames: () => document.getElementById("duration-frames"),
    applyBtn: () => document.getElementById("apply-btn"),
    feedback: () => document.getElementById("feedback-message")
  };
  function renderCategories() {
    const nav = el.categoryNav();
    nav.innerHTML = "";
    const categories = registry.getCategories();
    for (const cat of categories) {
      const btn = document.createElement("button");
      btn.className = `category-btn${cat === state.selectedCategory ? " category-btn--active" : ""}`;
      btn.textContent = CATEGORY_LABELS[cat];
      btn.dataset.category = cat;
      btn.addEventListener("click", () => {
        state.selectedCategory = cat;
        state.selectedPreset = null;
        renderCategories();
        renderTransitionGrid();
        updateApplyButton();
      });
      nav.appendChild(btn);
    }
  }
  const PARAM_ABBREV = {
    scale: "SCL",
    position: "POS",
    rotation: "ROT",
    opacity: "OPC"
  };
  function renderTransitionGrid() {
    var _a;
    const grid = el.transitionGrid();
    grid.innerHTML = "";
    const presets = registry.getByCategory(state.selectedCategory);
    el.presetCount().textContent = `${presets.length} transitions`;
    if (presets.length === 0) {
      grid.innerHTML = `<div class="empty-state">No transitions in this category.</div>`;
      return;
    }
    for (const preset of presets) {
      const card = document.createElement("div");
      card.className = `transition-card${((_a = state.selectedPreset) == null ? void 0 : _a.id) === preset.id ? " transition-card--selected" : ""}`;
      card.dataset.presetId = preset.id;
      card.title = preset.description;
      const paramSet = new Set(preset.parameters.map((p) => p.param));
      card.innerHTML = `
      <div class="card-name">${preset.name}</div>
      <div class="card-meta">
        <span class="card-duration">${preset.duration}f</span>
        <div class="card-params">
          ${Array.from(paramSet).map((p) => `<span class="param-badge param-badge--${p}">${PARAM_ABBREV[p] ?? p.slice(0, 3).toUpperCase()}</span>`).join("")}
        </div>
      </div>
    `;
      card.addEventListener("click", () => {
        state.selectedPreset = preset;
        el.durationSlider().value = String(preset.duration);
        state.durationFrames = preset.duration;
        el.durationFrames().textContent = String(preset.duration);
        renderTransitionGrid();
        updateApplyButton();
      });
      grid.appendChild(card);
    }
  }
  function initPlacementButtons() {
    el.btnBeginning().addEventListener("click", () => {
      state.placement = "beginning";
      el.btnBeginning().classList.add("placement-btn--active");
      el.btnEnd().classList.remove("placement-btn--active");
    });
    el.btnEnd().addEventListener("click", () => {
      state.placement = "end";
      el.btnEnd().classList.add("placement-btn--active");
      el.btnBeginning().classList.remove("placement-btn--active");
    });
  }
  function initDurationSlider() {
    el.durationSlider().addEventListener("input", (e) => {
      const val = parseInt(e.target.value, 10);
      state.durationFrames = val;
      el.durationFrames().textContent = String(val);
    });
  }
  let pollInterval = null;
  async function pollClipSelection() {
    try {
      const clips = await getSelectedVideoClips();
      if (clips.length > 0) {
        const firstName = `${clips.length} clip${clips.length > 1 ? "s" : ""} selected`;
        if (state.clipName !== firstName) {
          state.clipName = firstName;
          updateClipStatus(firstName, true);
          updateApplyButton();
        }
      } else {
        if (state.clipName !== null) {
          state.clipName = null;
          updateClipStatus("No clip selected", false);
          updateApplyButton();
        }
      }
    } catch {
    }
  }
  function startPolling() {
    if (pollInterval) return;
    pollInterval = setInterval(pollClipSelection, 800);
  }
  function updateClipStatus(name, selected) {
    const status = el.clipStatus();
    const label = el.clipNameLabel();
    status.className = `clip-status ${selected ? "clip-status--selected" : "clip-status--none"}`;
    label.textContent = name;
  }
  function updateApplyButton() {
    const btn = el.applyBtn();
    const canApply = state.selectedPreset !== null && state.clipName !== null && !state.isApplying;
    btn.disabled = !canApply;
  }
  async function handleApply() {
    if (!state.selectedPreset || state.isApplying) return;
    state.isApplying = true;
    updateApplyButton();
    showFeedback("Applying…", "info");
    try {
      const clips = await getSelectedVideoClips();
      if (clips.length === 0) {
        showFeedback("Select a clip on the timeline first", "error");
        return;
      }
      let successCount = 0;
      let lastError = "";
      for (const clip of clips) {
        const result = await applyTransition(clip, state.selectedPreset, {
          placement: state.placement,
          durationFrames: state.durationFrames
        });
        if (result.success) {
          successCount++;
        } else {
          lastError = result.message;
        }
      }
      if (successCount > 0) {
        const msg = clips.length > 1 ? `Applied to ${successCount}/${clips.length} clips` : `"${state.selectedPreset.name}" applied at ${state.placement}`;
        showFeedback(msg, "success");
      } else {
        showFeedback(lastError || "Apply failed", "error");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unexpected error";
      Logger.error("handleApply:", msg);
      showFeedback(msg, "error");
    } finally {
      state.isApplying = false;
      updateApplyButton();
    }
  }
  let feedbackTimer = null;
  function showFeedback(msg, type) {
    const el_fb = el.feedback();
    el_fb.textContent = msg;
    el_fb.className = `feedback-message feedback-message--${type}`;
    if (feedbackTimer) clearTimeout(feedbackTimer);
    if (type !== "info") {
      feedbackTimer = setTimeout(() => {
        el_fb.textContent = "";
        el_fb.className = "feedback-message";
      }, 4e3);
    }
  }
  function initApp() {
    Logger.info(`Initializing — ${registry.count()} presets loaded`);
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "./src/ui/styles.css";
    document.head.appendChild(link);
    renderCategories();
    renderTransitionGrid();
    initPlacementButtons();
    initDurationSlider();
    el.applyBtn().addEventListener("click", handleApply);
    updateApplyButton();
    updateClipStatus("No clip selected", false);
    startPolling();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }
})();
