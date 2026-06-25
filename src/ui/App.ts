import { registry } from "../presets/registry";
import type { TransitionPreset, TransitionCategory, TransitionPlacement } from "../presets/types";
import { CATEGORY_LABELS } from "../presets/types";
import { getSelectedVideoClips } from "../core/ClipService";
import { applyTransition } from "../core/TransitionEngine";
import { Logger } from "../utils/Logger";

// ──────────────────────────────────────────────────────────────────────────
// STATE
// ──────────────────────────────────────────────────────────────────────────

interface AppState {
  selectedCategory: TransitionCategory;
  selectedPreset: TransitionPreset | null;
  placement: TransitionPlacement;
  durationFrames: number;
  clipName: string | null;
  isApplying: boolean;
}

const state: AppState = {
  selectedCategory: "zoom",
  selectedPreset: null,
  placement: "beginning",
  durationFrames: 12,
  clipName: null,
  isApplying: false,
};

// ──────────────────────────────────────────────────────────────────────────
// DOM ELEMENT CACHE
// ──────────────────────────────────────────────────────────────────────────

const el = {
  categoryNav:   () => document.getElementById("category-nav")!,
  transitionGrid: () => document.getElementById("transition-grid")!,
  clipStatus:    () => document.getElementById("clip-status")!,
  clipNameLabel: () => document.getElementById("clip-name-label")!,
  presetCount:   () => document.getElementById("preset-count")!,
  btnBeginning:  () => document.getElementById("btn-beginning")! as HTMLButtonElement,
  btnEnd:        () => document.getElementById("btn-end")! as HTMLButtonElement,
  durationSlider: () => document.getElementById("duration-slider")! as HTMLInputElement,
  durationFrames: () => document.getElementById("duration-frames")!,
  applyBtn:      () => document.getElementById("apply-btn")! as HTMLButtonElement,
  feedback:      () => document.getElementById("feedback-message")!,
};

// ──────────────────────────────────────────────────────────────────────────
// RENDER — CATEGORIES
// ──────────────────────────────────────────────────────────────────────────

function renderCategories(): void {
  const nav = el.categoryNav();
  nav.innerHTML = "";

  const categories = registry.getCategories();
  for (const cat of categories) {
    const btn = document.createElement("button");
    btn.className = `category-btn${cat === state.selectedCategory ? " category-btn--active" : ""}`;
    btn.textContent = CATEGORY_LABELS[cat];
    btn.dataset.category = cat;
    btn.addEventListener("click", () => {
      state.selectedCategory = cat as TransitionCategory;
      state.selectedPreset = null;
      renderCategories();
      renderTransitionGrid();
      updateApplyButton();
    });
    nav.appendChild(btn);
  }
}

// ──────────────────────────────────────────────────────────────────────────
// RENDER — TRANSITION GRID
// ──────────────────────────────────────────────────────────────────────────

const PARAM_ABBREV: Record<string, string> = {
  scale: "SCL", position: "POS", rotation: "ROT", opacity: "OPC",
};

function renderTransitionGrid(): void {
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
    card.className = `transition-card${state.selectedPreset?.id === preset.id ? " transition-card--selected" : ""}`;
    card.dataset.presetId = preset.id;
    card.title = preset.description;

    const paramSet = new Set(preset.parameters.map((p) => p.param));

    card.innerHTML = `
      <div class="card-name">${preset.name}</div>
      <div class="card-meta">
        <span class="card-duration">${preset.duration}f</span>
        <div class="card-params">
          ${Array.from(paramSet)
            .map((p) => `<span class="param-badge param-badge--${p}">${PARAM_ABBREV[p] ?? p.slice(0, 3).toUpperCase()}</span>`)
            .join("")}
        </div>
      </div>
    `;

    card.addEventListener("click", () => {
      state.selectedPreset = preset;
      // Sync duration slider to preset reference duration (scaled from 24fps)
      el.durationSlider().value = String(preset.duration);
      state.durationFrames = preset.duration;
      el.durationFrames().textContent = String(preset.duration);
      renderTransitionGrid(); // re-render to update selection highlight
      updateApplyButton();
    });

    grid.appendChild(card);
  }
}

// ──────────────────────────────────────────────────────────────────────────
// PLACEMENT BUTTONS
// ──────────────────────────────────────────────────────────────────────────

function initPlacementButtons(): void {
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

// ──────────────────────────────────────────────────────────────────────────
// DURATION SLIDER
// ──────────────────────────────────────────────────────────────────────────

function initDurationSlider(): void {
  el.durationSlider().addEventListener("input", (e) => {
    const val = parseInt((e.target as HTMLInputElement).value, 10);
    state.durationFrames = val;
    el.durationFrames().textContent = String(val);
  });
}

// ──────────────────────────────────────────────────────────────────────────
// CLIP SELECTION POLLING
// ──────────────────────────────────────────────────────────────────────────

let pollInterval: ReturnType<typeof setInterval> | null = null;

async function pollClipSelection(): Promise<void> {
  try {
    const clips = await getSelectedVideoClips();
    if (clips.length > 0) {
      // Use the first selected clip's project item name
      // (getProjectItem is async so we cache a simple flag)
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
    // Normal when no project/sequence is open — silently ignore
  }
}

function startPolling(): void {
  if (pollInterval) return;
  pollInterval = setInterval(pollClipSelection, 800);
}

function updateClipStatus(name: string, selected: boolean): void {
  const status = el.clipStatus();
  const label = el.clipNameLabel();
  status.className = `clip-status ${selected ? "clip-status--selected" : "clip-status--none"}`;
  label.textContent = name;
}

// ──────────────────────────────────────────────────────────────────────────
// APPLY BUTTON STATE
// ──────────────────────────────────────────────────────────────────────────

function updateApplyButton(): void {
  const btn = el.applyBtn();
  const canApply = state.selectedPreset !== null && state.clipName !== null && !state.isApplying;
  btn.disabled = !canApply;
}

// ──────────────────────────────────────────────────────────────────────────
// APPLY TRANSITION
// ──────────────────────────────────────────────────────────────────────────

async function handleApply(): Promise<void> {
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
      const result = await applyTransition(clip, state.selectedPreset!, {
        placement: state.placement,
        durationFrames: state.durationFrames,
      });
      if (result.success) {
        successCount++;
      } else {
        lastError = result.message;
      }
    }

    if (successCount > 0) {
      const msg = clips.length > 1
        ? `Applied to ${successCount}/${clips.length} clips`
        : `"${state.selectedPreset!.name}" applied at ${state.placement}`;
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

// ──────────────────────────────────────────────────────────────────────────
// FEEDBACK
// ──────────────────────────────────────────────────────────────────────────

let feedbackTimer: ReturnType<typeof setTimeout> | null = null;

function showFeedback(msg: string, type: "success" | "error" | "info"): void {
  const el_fb = el.feedback();
  el_fb.textContent = msg;
  el_fb.className = `feedback-message feedback-message--${type}`;
  if (feedbackTimer) clearTimeout(feedbackTimer);
  if (type !== "info") {
    feedbackTimer = setTimeout(() => {
      el_fb.textContent = "";
      el_fb.className = "feedback-message";
    }, 4000);
  }
}

// ──────────────────────────────────────────────────────────────────────────
// INIT
// ──────────────────────────────────────────────────────────────────────────

export function initApp(): void {
  Logger.info(`Initializing — ${registry.count()} presets loaded`);

  // Inject stylesheet
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "./src/ui/styles.css";
  document.head.appendChild(link);

  renderCategories();
  renderTransitionGrid();
  initPlacementButtons();
  initDurationSlider();

  el.applyBtn().addEventListener("click", handleApply);

  // Initial state
  updateApplyButton();
  updateClipStatus("No clip selected", false);

  startPolling();
}
