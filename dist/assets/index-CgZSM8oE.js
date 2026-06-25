(function() {
  "use strict";
  var __vite_style__ = document.createElement("style");
  __vite_style__.textContent = "/* ============================================================\n   Quick Transition Builder — Panel Styles\n   Target: Adobe UXP / Premiere Pro 26\n   Design: Dark theme matching Premiere's default dark UI\n   ============================================================ */\n\n/* ── Reset ── */\n*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }\n\n/* ── Root Variables ── */\n:root {\n  --bg-panel:      #1a1a1a;\n  --bg-section:    #222222;\n  --bg-element:    #2e2e2e;\n  --bg-hover:      #3a3a3a;\n  --bg-active:     #0f4c8a;\n  --bg-active-h:   #1565c0;\n  --border:        #3d3d3d;\n  --border-light:  #4a4a4a;\n  --text-primary:  #e0e0e0;\n  --text-secondary:#9e9e9e;\n  --text-muted:    #6e6e6e;\n  --accent:        #2196f3;\n  --accent-h:      #42a5f5;\n  --success:       #4caf50;\n  --error:         #f44336;\n  --warning:       #ff9800;\n  --radius-sm:     4px;\n  --radius-md:     6px;\n  --radius-lg:     8px;\n  --font:          'Adobe Clean', 'Segoe UI', system-ui, sans-serif;\n  --font-mono:     'Adobe Clean Mono', 'Consolas', monospace;\n}\n\n/* ── Body ── */\nhtml, body {\n  background: var(--bg-panel);\n  color: var(--text-primary);\n  font-family: var(--font);\n  font-size: 12px;\n  line-height: 1.4;\n  height: 100%;\n  overflow-x: hidden;\n  -webkit-font-smoothing: antialiased;\n}\n\n/* ── App Container ── */\n#app {\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n  padding-bottom: 8px;\n}\n\n/* ── HEADER ── */\n.panel-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 8px 10px;\n  background: #161616;\n  border-bottom: 1px solid var(--border);\n  min-height: 36px;\n}\n\n.header-left {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n\n.logo-icon {\n  width: 16px;\n  height: 16px;\n  color: var(--accent);\n  flex-shrink: 0;\n}\n\n.panel-title {\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--text-primary);\n  letter-spacing: 0.02em;\n}\n\n/* Clip status indicator */\n.clip-status {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  font-size: 11px;\n  color: var(--text-muted);\n  max-width: 140px;\n  overflow: hidden;\n}\n\n.clip-status .status-dot {\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  background: var(--text-muted);\n  flex-shrink: 0;\n}\n\n.clip-status--selected .status-dot { background: var(--success); }\n.clip-status--selected { color: var(--text-secondary); }\n.clip-status--none .status-dot { background: var(--text-muted); }\n\n#clip-name-label {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n/* ── PANEL SECTIONS ── */\n.panel-section {\n  padding: 10px;\n  border-bottom: 1px solid var(--border);\n}\n\n.section-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 7px;\n}\n\n.section-label {\n  font-size: 10px;\n  font-weight: 600;\n  color: var(--text-muted);\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n\n.preset-count {\n  font-size: 10px;\n  color: var(--text-muted);\n}\n\n/* ── CATEGORY NAV ── */\n.category-nav {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 4px;\n}\n\n.category-btn {\n  padding: 4px 9px;\n  border-radius: var(--radius-sm);\n  border: 1px solid var(--border);\n  background: var(--bg-element);\n  color: var(--text-secondary);\n  font-size: 11px;\n  cursor: pointer;\n  transition: background 0.12s, color 0.12s, border-color 0.12s;\n  white-space: nowrap;\n}\n\n.category-btn:hover {\n  background: var(--bg-hover);\n  border-color: var(--border-light);\n  color: var(--text-primary);\n}\n\n.category-btn--active {\n  background: var(--bg-active);\n  border-color: var(--accent);\n  color: #fff;\n}\n\n.category-btn--active:hover {\n  background: var(--bg-active-h);\n}\n\n/* ── TRANSITION GRID ── */\n.transition-grid {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 4px;\n  max-height: 280px;\n  overflow-y: auto;\n  scrollbar-width: thin;\n  scrollbar-color: var(--border) transparent;\n}\n\n.transition-grid::-webkit-scrollbar { width: 5px; }\n.transition-grid::-webkit-scrollbar-track { background: transparent; }\n.transition-grid::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }\n\n.transition-card {\n  padding: 7px 9px;\n  border-radius: var(--radius-sm);\n  border: 1px solid var(--border);\n  background: var(--bg-element);\n  cursor: pointer;\n  transition: background 0.1s, border-color 0.1s;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  position: relative;\n  overflow: hidden;\n}\n\n.transition-card:hover {\n  background: var(--bg-hover);\n  border-color: var(--border-light);\n}\n\n.transition-card--selected {\n  border-color: var(--accent);\n  background: rgba(33, 150, 243, 0.12);\n}\n\n.transition-card--selected:hover {\n  background: rgba(33, 150, 243, 0.18);\n}\n\n.card-name {\n  font-size: 11px;\n  font-weight: 500;\n  color: var(--text-primary);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.card-meta {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n\n.card-duration {\n  font-size: 10px;\n  color: var(--text-muted);\n  font-family: var(--font-mono);\n}\n\n.card-params {\n  display: flex;\n  gap: 3px;\n}\n\n.param-badge {\n  font-size: 9px;\n  padding: 1px 4px;\n  border-radius: 2px;\n  background: var(--bg-panel);\n  color: var(--text-muted);\n  border: 1px solid var(--border);\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n}\n\n.param-badge--scale    { border-color: #1565c0; color: #64b5f6; }\n.param-badge--position { border-color: #1b5e20; color: #81c784; }\n.param-badge--rotation { border-color: #4a148c; color: #ce93d8; }\n.param-badge--opacity  { border-color: #e65100; color: #ffb74d; }\n\n/* ── OPTIONS SECTION ── */\n.section--options {}\n\n.placement-row {\n  display: flex;\n  gap: 6px;\n  margin-bottom: 10px;\n}\n\n.placement-btn {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  padding: 7px 10px;\n  border-radius: var(--radius-sm);\n  border: 1px solid var(--border);\n  background: var(--bg-element);\n  color: var(--text-secondary);\n  font-size: 11px;\n  font-weight: 500;\n  cursor: pointer;\n  transition: background 0.12s, border-color 0.12s, color 0.12s;\n}\n\n.placement-btn svg {\n  width: 14px;\n  height: 14px;\n  flex-shrink: 0;\n}\n\n.placement-btn:hover {\n  background: var(--bg-hover);\n  border-color: var(--border-light);\n  color: var(--text-primary);\n}\n\n.placement-btn--active {\n  background: var(--bg-active);\n  border-color: var(--accent);\n  color: #fff;\n}\n\n.placement-btn--active:hover {\n  background: var(--bg-active-h);\n}\n\n/* Duration control */\n.duration-row {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n\n.duration-control {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.duration-slider {\n  flex: 1;\n  -webkit-appearance: none;\n  height: 3px;\n  border-radius: 2px;\n  background: var(--border);\n  cursor: pointer;\n  outline: none;\n}\n\n.duration-slider::-webkit-slider-thumb {\n  -webkit-appearance: none;\n  width: 12px;\n  height: 12px;\n  border-radius: 50%;\n  background: var(--accent);\n  cursor: pointer;\n  box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.3);\n}\n\n.duration-slider::-moz-range-thumb {\n  width: 12px;\n  height: 12px;\n  border-radius: 50%;\n  background: var(--accent);\n  cursor: pointer;\n  border: none;\n}\n\n.duration-display {\n  display: flex;\n  align-items: baseline;\n  gap: 2px;\n  min-width: 48px;\n  justify-content: flex-end;\n}\n\n#duration-frames {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--accent);\n  font-family: var(--font-mono);\n}\n\n.duration-unit {\n  font-size: 10px;\n  color: var(--text-muted);\n}\n\n/* ── APPLY SECTION ── */\n.section--apply {\n  border-bottom: none;\n  padding-top: 10px;\n  padding-bottom: 12px;\n}\n\n.apply-btn {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  padding: 10px 16px;\n  border-radius: var(--radius-md);\n  border: none;\n  background: var(--accent);\n  color: #fff;\n  font-size: 12px;\n  font-weight: 600;\n  cursor: pointer;\n  letter-spacing: 0.03em;\n  transition: background 0.12s, opacity 0.12s, transform 0.08s;\n}\n\n.apply-btn svg {\n  width: 14px;\n  height: 14px;\n}\n\n.apply-btn:hover:not(:disabled) {\n  background: var(--accent-h);\n}\n\n.apply-btn:active:not(:disabled) {\n  transform: scale(0.98);\n}\n\n.apply-btn:disabled {\n  background: var(--bg-element);\n  color: var(--text-muted);\n  cursor: not-allowed;\n  opacity: 0.7;\n}\n\n/* Feedback */\n.feedback-message {\n  margin-top: 8px;\n  font-size: 11px;\n  text-align: center;\n  min-height: 16px;\n  transition: color 0.2s;\n}\n\n.feedback-message--success { color: var(--success); }\n.feedback-message--error   { color: var(--error);   }\n.feedback-message--info    { color: var(--text-secondary); }\n\n/* ── EMPTY STATES ── */\n.empty-state {\n  padding: 20px 10px;\n  text-align: center;\n  color: var(--text-muted);\n  font-size: 11px;\n  line-height: 1.6;\n}\n/*$vite$:1*/";
  document.head.appendChild(__vite_style__);
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
  const PREFIX = "[QuickTransitions]";
  const Logger = {
    info: (msg, ...args) => console.log(`${PREFIX} ${msg}`, ...args),
    warn: (msg, ...args) => console.warn(`${PREFIX} WARN: ${msg}`, ...args),
    error: (msg, ...args) => console.error(`${PREFIX} ERROR: ${msg}`, ...args),
    debug: (msg, ...args) => console.debug(`${PREFIX} DBG: ${msg}`, ...args)
  };
  function evalScript(script) {
    return new Promise((resolve) => {
      try {
        const cep = window.__adobe_cep__;
        if (!cep) {
          resolve('{"count":0,"clips":[]}');
          return;
        }
        cep.evalScript(script, (r) => resolve(r ?? "null"));
      } catch (e) {
        resolve(`{"error":"${String(e)}"}`);
      }
    });
  }
  async function getClipInfo() {
    const raw = await evalScript("getClipInfoJSON()");
    try {
      return JSON.parse(raw);
    } catch {
      return { count: 0, clips: [] };
    }
  }
  async function applyTransitionCEP(preset, options) {
    const p = JSON.stringify(JSON.stringify(preset));
    const o = JSON.stringify(JSON.stringify(options));
    const raw = await evalScript(`applyTransitionJSON(${p}, ${o})`);
    try {
      return JSON.parse(raw);
    } catch {
      return { success: false, message: "Błąd komunikacji z Premiere Pro" };
    }
  }
  const state = {
    selectedCategory: "zoom",
    selectedPreset: null,
    placement: "beginning",
    durationFrames: 12,
    clipCount: 0,
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
    for (const cat of registry.getCategories()) {
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
      </div>`;
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
      const info = await getClipInfo();
      const count = info.count ?? 0;
      if (count !== state.clipCount) {
        state.clipCount = count;
        if (count > 0) {
          updateClipStatus(`${count} klip${count > 1 ? "y/ów" : ""} wybrany/-ch`, true);
        } else {
          updateClipStatus("Brak wybranego klipu", false);
        }
        updateApplyButton();
      }
    } catch {
    }
  }
  function startPolling() {
    if (pollInterval) return;
    pollInterval = setInterval(pollClipSelection, 800);
  }
  function updateClipStatus(name, selected) {
    el.clipStatus().className = `clip-status ${selected ? "clip-status--selected" : "clip-status--none"}`;
    el.clipNameLabel().textContent = name;
  }
  function updateApplyButton() {
    el.applyBtn().disabled = !(state.selectedPreset !== null && state.clipCount > 0 && !state.isApplying);
  }
  async function handleApply() {
    if (!state.selectedPreset || state.isApplying) return;
    state.isApplying = true;
    updateApplyButton();
    showFeedback("Stosowanie…", "info");
    try {
      const result = await applyTransitionCEP(state.selectedPreset, {
        placement: state.placement,
        durationFrames: state.durationFrames
      });
      showFeedback(result.message, result.success ? "success" : "error");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Nieoczekiwany błąd";
      Logger.error("handleApply:", msg);
      showFeedback(msg, "error");
    } finally {
      state.isApplying = false;
      updateApplyButton();
    }
  }
  let feedbackTimer = null;
  function showFeedback(msg, type) {
    const fb = el.feedback();
    fb.textContent = msg;
    fb.className = `feedback-message feedback-message--${type}`;
    if (feedbackTimer) clearTimeout(feedbackTimer);
    if (type !== "info") {
      feedbackTimer = setTimeout(() => {
        fb.textContent = "";
        fb.className = "feedback-message";
      }, 4e3);
    }
  }
  function initApp() {
    Logger.info(`Initializing — ${registry.count()} presets loaded`);
    renderCategories();
    renderTransitionGrid();
    initPlacementButtons();
    initDurationSlider();
    el.applyBtn().addEventListener("click", handleApply);
    updateApplyButton();
    updateClipStatus("Brak wybranego klipu", false);
    startPolling();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }
})();
