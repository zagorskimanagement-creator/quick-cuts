import type { TickTime, PremierePro } from "premierepro";

const ppro = require("premierepro") as PremierePro;

/**
 * Parses a Premiere Pro timebase string (e.g. "24000/1001", "25/1") to fps.
 */
export function parseFrameRate(timebase: string): number {
  const parts = timebase.split("/");
  if (parts.length !== 2) return 24;
  const num = parseFloat(parts[0]);
  const den = parseFloat(parts[1]);
  if (den === 0) return 24;
  return num / den;
}

/**
 * Converts a frame count to TickTime using the sequence timebase string.
 * Uses createWithFrameAndFrameRate for precision — avoids floating-point drift.
 */
export function framesToTickTime(frame: number, timebase: string): TickTime {
  return ppro.TickTime.createWithFrameAndFrameRate(frame, timebase);
}

/**
 * Converts a TickTime duration to a frame count (rounded to nearest frame).
 */
export function tickTimeToFrames(time: TickTime, timebase: string): number {
  const fps = parseFrameRate(timebase);
  return Math.round(time.seconds * fps);
}

/**
 * Builds the local clip-media TickTime for a keyframe at `frameOffset` frames
 * from the clip's start on the timeline.
 *
 * Formula: localTime = clipInPoint + frameOffset
 *
 * clipInPoint is where in the SOURCE MEDIA the clip starts.
 * Adding frameOffset (frames from clip timeline start) gives the correct
 * source-media time, which is what kf.position requires.
 */
export function buildLocalKfTime(
  clipInPoint: TickTime,
  frameOffset: number,
  timebase: string
): TickTime {
  const offsetTime = framesToTickTime(frameOffset, timebase);
  return clipInPoint.add(offsetTime);
}
