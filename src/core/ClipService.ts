import type { VideoClipTrackItem, Sequence, PremierePro } from "premierepro";
import { parseFrameRate } from "../utils/TimeUtils";
import { Logger } from "../utils/Logger";

const ppro = require("premierepro") as PremierePro;

export interface ClipInfo {
  clip: VideoClipTrackItem;
  name: string;
  durationFrames: number;
  timebase: string;
}

/**
 * Returns the currently selected VideoClipTrackItems on the active sequence.
 * Audio items are filtered out by duck-typing on getComponentChain.
 */
export async function getSelectedVideoClips(): Promise<VideoClipTrackItem[]> {
  const project = await ppro.Project.getActiveProject();
  if (!project) throw new Error("No active project");

  const sequence = await project.getActiveSequence();
  if (!sequence) throw new Error("No active sequence");

  const selection = await sequence.getSelection();
  const trackItems = await selection.getTrackItems();

  const videoClips: VideoClipTrackItem[] = [];

  for (const item of trackItems) {
    // Duck-type: only VideoClipTrackItem has getComponentChain()
    if (
      "getComponentChain" in item &&
      typeof (item as VideoClipTrackItem).getComponentChain === "function"
    ) {
      videoClips.push(item as VideoClipTrackItem);
    }
  }

  return videoClips;
}

/**
 * Returns the active sequence, or throws if none open.
 */
export async function getActiveSequence(): Promise<Sequence> {
  const project = await ppro.Project.getActiveProject();
  if (!project) throw new Error("No active project");
  const sequence = await project.getActiveSequence();
  if (!sequence) throw new Error("No active sequence");
  return sequence;
}

/**
 * Gathers timing metadata for a clip needed by the transition engine.
 */
export async function getClipInfo(clip: VideoClipTrackItem): Promise<ClipInfo | null> {
  try {
    const sequence = await getActiveSequence();
    const timebase = await sequence.getTimebase();
    const projectItem = await clip.getProjectItem();
    const duration = await clip.getDuration();

    const fps = parseFrameRate(timebase);
    const durationFrames = Math.round(duration.seconds * fps);

    return {
      clip,
      name: projectItem?.name ?? "Unknown clip",
      durationFrames,
      timebase,
    };
  } catch (err) {
    Logger.error("getClipInfo failed", err);
    return null;
  }
}
