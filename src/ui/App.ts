import { registry } from "../presets/registry";
import type { TransitionPreset, TransitionCategory, TransitionPlacement } from "../presets/types";
import { CATEGORY_LABELS } from "../presets/types";
import { Logger } from "../utils/Logger";

// ── CEP Bridge ────────────────────────────────────────────────────────────────

interface ClipInfo { index: number; name: string; durationFrames: number; }
interface ClipInfoResponse { count: number; clips: ClipInfo[]; error?: string; }
interface ApplyResponse { success: boolean; message: string; }

function evalScript(script: string): Promise<string> {
  return new Promise((resolve) => {
    try {
      const cep = (window as unknown as Record<string, unknown>).__adobe_cep__ as
        { evalScript(s: string, cb: (r: string) => void): void } | undefined;
      if (!cep) { resolve('{"count":0,"clips":[]}'); return; }
      cep.evalScript(script, (r) => resolve(r ?? "null"));
    } catch (e) {
      resolve(`{"error":"${String(e)}"}`);
    }
  });
}

async function getClipInfo(): Promise<ClipInfoResponse> {
  const raw = await evalScript("getClipInfoJSON()");
  try { return JSON.parse(raw) as ClipInfoResponse; }
  catch { return { count: 0, clips: [] }; }
}

async function applyTransitionCEP(
  preset: TransitionPreset,
  options: { placement: TransitionPlacement; durationFrames: number }
): Promise<ApplyResponse> {
  // Double-stringify so the JSON string is safely embedded as a JSX string argument
  const p = JSON.stringify(JSON.stringify(preset));
  const o = JSON.stringify(JSON.stringify(options));
  const raw = await evalScript(`applyTransitionJSON(${p}, ${o})`);
  try { return JSON.parse(raw) as ApplyResponse; }
  catch { return { success: false, message: "Błąd komunikacji z Premiere Pro" }; }
}

// ── State ─────────────────────────────────────────────────────────────────────

interface AppState {
  selectedCategory: TransitionCategory;
  selectedPreset:   TransitionPreset | null;
  placement:        TransitionPlacement;
  durationFrames:   number;
  clipCount:        number;
  isApplying:       boolean;
}

const state: AppState = {
  selectedCategory: "zoom",
  selectedPreset:   null,
  placement:        "beginning",
  durationFrames:   12,
  clipCount:        0,
  isApplying:       false,
};

// ── DOM helpers ───────────────────────────────────────────────────────────────

const el = {
  categoryNav:    () => document.getElementById("category-nav")!,
  transitionGrid: () => document.getElementById("transition-grid")!,
  clipStatus:     () => document.getElementById("clip-status")!,
  clipNameLabel:  () => document.getElementById("clip-name-label")!,
  presetCount:    () => document.getElementById("preset-count")!,
  btnBeginning:   () => document.getElementById("btn-beginning")!  as HTMLButtonElement,
  btnEnd:         () => document.getElementById("btn-end")!         as HTMLButtonElement,
  durationSlider: () => document.getElementById("duration-slider")! as HTMLInputElement,
  durationFrames: () => document.getElementById("duration-frames")!,
  applyBtn:       () => document.getElementById("apply-btn")!       as HTMLButtonElement,
  feedback:       () => document.getElementById("feedback-message")!,
};

// ── Render: categories ────────────────────────────────────────────────────────

function renderCategories(): void {
  const nav = el.categoryNav();
  nav.innerHTML = "";
  for (const cat of registry.getCategories()) {
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

// ── Render: grid ──────────────────────────────────────────────────────────────

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

// ── Controls ──────────────────────────────────────────────────────────────────

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

function initDurationSlider(): void {
  el.durationSlider().addEventListener("input", (e) => {
    const val = parseInt((e.target as HTMLInputElement).value, 10);
    state.durationFrames = val;
    el.durationFrames().textContent = String(val);
  });
}

// ── Clip polling ──────────────────────────────────────────────────────────────

let pollInterval: ReturnType<typeof setInterval> | null = null;

async function pollClipSelection(): Promise<void> {
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
    // No project/sequence open — ignore silently
  }
}

function startPolling(): void {
  if (pollInterval) return;
  pollInterval = setInterval(pollClipSelection, 800);
}

function updateClipStatus(name: string, selected: boolean): void {
  el.clipStatus().className = `clip-status ${selected ? "clip-status--selected" : "clip-status--none"}`;
  el.clipNameLabel().textContent = name;
}

// ── Apply button ──────────────────────────────────────────────────────────────

function updateApplyButton(): void {
  el.applyBtn().disabled = !(state.selectedPreset !== null && state.clipCount > 0 && !state.isApplying);
}

// ── Apply handler ─────────────────────────────────────────────────────────────

async function handleApply(): Promise<void> {
  if (!state.selectedPreset || state.isApplying) return;

  state.isApplying = true;
  updateApplyButton();
  showFeedback("Stosowanie…", "info");

  try {
    const result = await applyTransitionCEP(state.selectedPreset, {
      placement:      state.placement,
      durationFrames: state.durationFrames,
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

// ── Feedback ──────────────────────────────────────────────────────────────────

let feedbackTimer: ReturnType<typeof setTimeout> | null = null;

function showFeedback(msg: string, type: "success" | "error" | "info"): void {
  const fb = el.feedback();
  fb.textContent = msg;
  fb.className = `feedback-message feedback-message--${type}`;
  if (feedbackTimer) clearTimeout(feedbackTimer);
  if (type !== "info") {
    feedbackTimer = setTimeout(() => {
      fb.textContent = "";
      fb.className = "feedback-message";
    }, 4000);
  }
}

// ── Init ──────────────────────────────────────────────────────────────────────

export function initApp(): void {
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
