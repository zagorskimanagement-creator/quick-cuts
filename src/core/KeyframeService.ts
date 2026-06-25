import type { Action, ComponentParam, PointF, TickTime, PremierePro } from "premierepro";

const ppro = require("premierepro") as PremierePro;

export type InterpolationMode = "BEZIER" | "LINEAR" | "HOLD" | "EASE_IN" | "EASE_OUT";

/**
 * Maps preset interpolation names to Premiere Pro Constants.
 * EASE_IN/EASE_OUT fall back to BEZIER when not available (older Premiere versions).
 */
function getInterpConstant(mode: InterpolationMode): number {
  const C = ppro.Constants;
  switch (mode) {
    case "LINEAR":   return C.INTERPOLATION_MODE_LINEAR;
    case "HOLD":     return C.INTERPOLATION_MODE_HOLD;
    case "EASE_IN":  return C.INTERPOLATION_MODE_EASE_IN  ?? C.INTERPOLATION_MODE_BEZIER;
    case "EASE_OUT": return C.INTERPOLATION_MODE_EASE_OUT ?? C.INTERPOLATION_MODE_BEZIER;
    case "BEZIER":
    default:         return C.INTERPOLATION_MODE_BEZIER;
  }
}

export interface KeyframeSpec {
  /** Local clip media time (built with buildLocalKfTime). */
  time: TickTime;
  /** Scalar for Scale/Rotation/Opacity, PointF for Position. */
  value: number | PointF;
  interpolation: InterpolationMode;
}

/**
 * Builds the complete action list for animating a single ComponentParam.
 * Returns Actions ready to be executed inside a lockedAccess transaction.
 */
export function buildParamKeyframeActions(
  param: ComponentParam,
  specs: KeyframeSpec[]
): Action[] {
  const actions: Action[] = [];

  // Enable time-varying (keyframe) mode for this parameter
  actions.push(param.createSetTimeVaryingAction(true));

  for (const spec of specs) {
    const kf = param.createKeyframe(spec.value);
    kf.position = spec.time;
    actions.push(param.createAddKeyframeAction(kf));
    actions.push(
      param.createSetInterpolationAtKeyframeAction(
        spec.time,
        getInterpConstant(spec.interpolation),
        false // Update UI only after entire transaction commits
      )
    );
  }

  return actions;
}

/**
 * Executes a batch of actions atomically inside a lockedAccess transaction.
 * Represents a single undo step in Premiere's history.
 */
export async function commitActions(
  actions: Action[],
  undoLabel: string
): Promise<void> {
  if (actions.length === 0) return;

  const project = await ppro.Project.getActiveProject();
  await project.lockedAccess(() => {
    project.executeTransaction((tx) => {
      for (const action of actions) {
        tx.executeAction(action);
      }
    }, undoLabel);
  });
}
