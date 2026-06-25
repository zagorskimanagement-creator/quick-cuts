import { ALL_PRESETS } from "./library";
import type { TransitionPreset, TransitionCategory } from "./types";

/**
 * Central registry for all transition presets.
 * Single source of truth — add new presets to library.ts, they appear here automatically.
 */
export class PresetRegistry {
  private readonly _presets: Map<string, TransitionPreset>;

  constructor() {
    this._presets = new Map(ALL_PRESETS.map((p) => [p.id, p]));
  }

  getAll(): TransitionPreset[] {
    return Array.from(this._presets.values());
  }

  getById(id: string): TransitionPreset | undefined {
    return this._presets.get(id);
  }

  getByCategory(category: TransitionCategory): TransitionPreset[] {
    return this.getAll().filter((p) => p.category === category);
  }

  getCategories(): TransitionCategory[] {
    const seen = new Set<TransitionCategory>();
    for (const p of this._presets.values()) seen.add(p.category);
    return Array.from(seen);
  }

  count(): number {
    return this._presets.size;
  }
}

export const registry = new PresetRegistry();
