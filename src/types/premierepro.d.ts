/**
 * Adobe Premiere Pro UXP Type Declarations — Named-export form.
 *
 * Usage in source files:
 *   import type { VideoClipTrackItem, TickTime, ComponentParam } from "premierepro";
 *   import type { PremierePro } from "premierepro";
 *   const ppro = require("premierepro") as PremierePro;
 *
 * KEY NOTES:
 * - Motion effect match name: "AE.ADBE Motion"
 * - Opacity match name:       "AE.ADBE Opacity"
 * - Motion param indices:
 *     0 = Position (PointF, pixels from top-left, default center = seqW/2, seqH/2)
 *     1 = Scale    (number, 100 = 100%)
 *     4 = Rotation (number, degrees, positive = CW)
 *     5 = Anchor Point (PointF)
 * - Opacity param index 0 = Opacity (number 0–100)
 */

declare module "premierepro" {

  // ──────────────────────────────────────────────────────────────────────
  // PRIMITIVES
  // ──────────────────────────────────────────────────────────────────────

  export interface PointF {
    x: number;
    y: number;
  }

  // ──────────────────────────────────────────────────────────────────────
  // TICK TIME
  // ──────────────────────────────────────────────────────────────────────

  export interface TickTime {
    readonly seconds: number;
    readonly ticks: number;
    readonly ticksNumber: number;
    add(other: TickTime): TickTime;
    subtract(other: TickTime): TickTime;
    multiply(factor: number): TickTime;
    divide(divisor: number): TickTime;
    alignToFrame(frameRate: string): TickTime;
    alignToNearestFrame(frameRate: string): TickTime;
  }

  export interface TickTimeStatic {
    readonly TIME_ZERO: TickTime;
    readonly TIME_INVALID: TickTime;
    readonly TIME_MAX: TickTime;
    readonly TIME_MIN: TickTime;
    readonly TIME_ONE_SECOND: TickTime;
    createWithSeconds(seconds: number): TickTime;
    createWithTicks(ticks: number): TickTime;
    createWithFrameAndFrameRate(frame: number, frameRate: string): TickTime;
  }

  // ──────────────────────────────────────────────────────────────────────
  // CONSTANTS
  // ──────────────────────────────────────────────────────────────────────

  export interface ConstantsType {
    readonly INTERPOLATION_MODE_LINEAR: number;
    readonly INTERPOLATION_MODE_HOLD: number;
    readonly INTERPOLATION_MODE_BEZIER: number;
    readonly INTERPOLATION_MODE_TIME: number;
    readonly INTERPOLATION_MODE_TIME_TRANSITION_START: number;
    readonly INTERPOLATION_MODE_TIME_TRANSITION_END: number;
    // EASE_IN / EASE_OUT may not exist on all Premiere versions — declared optional
    readonly INTERPOLATION_MODE_EASE_IN?: number;
    readonly INTERPOLATION_MODE_EASE_OUT?: number;
  }

  // ──────────────────────────────────────────────────────────────────────
  // UTILS
  // ──────────────────────────────────────────────────────────────────────

  export interface UtilsType {
    createPointF(x: number, y: number): PointF;
  }

  // ──────────────────────────────────────────────────────────────────────
  // ACTION / TRANSACTION
  // ──────────────────────────────────────────────────────────────────────

  export interface Action {}

  export interface Transaction {
    executeAction(action: Action): void;
  }

  // ──────────────────────────────────────────────────────────────────────
  // KEYFRAME
  // ──────────────────────────────────────────────────────────────────────

  export interface Keyframe {
    value: number | PointF | boolean;
    position: TickTime; // Writable — set to local clip media time
    getTemporalInterpolationMode(): Promise<number>;
    setTemporalInterpolationMode(mode: number): Promise<boolean>;
  }

  // ──────────────────────────────────────────────────────────────────────
  // COMPONENT PARAM
  // ──────────────────────────────────────────────────────────────────────

  export interface ComponentParam {
    readonly displayName: string;
    createKeyframe(value: number | PointF | boolean): Keyframe;
    getValueAtTime(time: TickTime): Promise<number | PointF | boolean>;
    createAddKeyframeAction(keyframe: Keyframe): Action;
    createRemoveKeyframeAction(time: TickTime, updateUI?: boolean): Action;
    createRemoveKeyframeRangeAction(start: TickTime, end: TickTime, updateUI?: boolean): Action;
    createSetValueAction(keyframe: Keyframe, safeForPlayback?: boolean): Action;
    createSetTimeVaryingAction(timeVarying: boolean): Action;
    createSetInterpolationAtKeyframeAction(time: TickTime, mode: number, updateUI?: boolean): Action;
    getStartValue(): Promise<Keyframe>;
    getKeyframeListAsTickTimes(): TickTime[];
    getKeyframePtr(time?: TickTime): Keyframe;
    isTimeVarying(): boolean;
    areKeyframesSupported(): Promise<boolean>;
    findNearestKeyframe(time: TickTime, delta: TickTime): Keyframe;
    findNextKeyframe(time: TickTime): Keyframe;
    findPreviousKeyframe(time: TickTime): Keyframe;
  }

  // ──────────────────────────────────────────────────────────────────────
  // VIDEO COMPONENT
  // ──────────────────────────────────────────────────────────────────────

  export interface VideoComponent {
    getMatchName(): Promise<string>;
    getDisplayName(): Promise<string>;
    getParam(paramIndex: number): ComponentParam;
    getParamCount(): number;
  }

  export interface VideoFilterComponent {}

  // ──────────────────────────────────────────────────────────────────────
  // VIDEO COMPONENT CHAIN
  // ──────────────────────────────────────────────────────────────────────

  export interface VideoComponentChain {
    getComponentAtIndex(index: number): VideoComponent;
    getComponentCount(): number;
    createInsertComponentAction(component: VideoFilterComponent, index: number): Action;
    createAppendComponentAction(component: VideoFilterComponent): Action;
    createRemoveComponentAction(component: VideoComponent): Action;
  }

  // ──────────────────────────────────────────────────────────────────────
  // TRACK ITEMS
  // ──────────────────────────────────────────────────────────────────────

  export interface VideoClipTrackItem {
    getStartTime(): Promise<TickTime>;
    getEndTime(): Promise<TickTime>;
    getInPoint(): Promise<TickTime>;
    getOutPoint(): Promise<TickTime>;
    getDuration(): Promise<TickTime>;
    getComponentChain(): Promise<VideoComponentChain>;
    getProjectItem(): Promise<ProjectItem>;
    getType(): Promise<number>;
    isDisabled(): Promise<boolean>;
    getTrackIndex(): Promise<number>;
    getMatchName(): Promise<string>;
    createSetInPointAction(time: TickTime): Action;
    createSetOutPointAction(time: TickTime): Action;
    createMoveAction(time: TickTime): Action;
  }

  export interface AudioClipTrackItem {
    getStartTime(): Promise<TickTime>;
    getEndTime(): Promise<TickTime>;
    getType(): Promise<number>;
  }

  // ──────────────────────────────────────────────────────────────────────
  // TRACKS
  // ──────────────────────────────────────────────────────────────────────

  export interface VideoTrack {
    getTrackItemCount(): Promise<number>;
    getTrackItemAtIndex(index: number): Promise<VideoClipTrackItem>;
  }

  export interface AudioTrack {
    getTrackItemCount(): Promise<number>;
  }

  // ──────────────────────────────────────────────────────────────────────
  // TRACK ITEM SELECTION
  // ──────────────────────────────────────────────────────────────────────

  export interface TrackItemSelectionStatic {
    createEmptySelection(): TrackItemSelection;
  }

  export interface TrackItemSelection {
    addItem(item: VideoClipTrackItem | AudioClipTrackItem): boolean;
    removeItem(item: VideoClipTrackItem | AudioClipTrackItem): boolean;
    getTrackItems(): Promise<Array<VideoClipTrackItem | AudioClipTrackItem>>;
  }

  // ──────────────────────────────────────────────────────────────────────
  // SEQUENCE
  // ──────────────────────────────────────────────────────────────────────

  export interface SequenceSettings {
    videoFrameWidth: number;
    videoFrameHeight: number;
    videoFrameRate: string;
    audioSampleRate: number;
  }

  export interface Sequence {
    getTimebase(): Promise<string>;
    getSettings(): Promise<SequenceSettings>;
    getSelection(): Promise<TrackItemSelection>;
    setSelection(selection: TrackItemSelection): Promise<boolean>;
    getVideoTrackCount(): Promise<number>;
    getAudioTrackCount(): Promise<number>;
    getVideoTrack(index: number): Promise<VideoTrack>;
    getAudioTrack(index: number): Promise<AudioTrack>;
    getInPoint(): Promise<TickTime>;
    getOutPoint(): Promise<TickTime>;
    getEndTime(): Promise<TickTime>;
    getZeroPoint(): Promise<TickTime>;
    createSubsequence(ignoreTrackTargeting?: boolean): Promise<Sequence>;
    getProjectItem(): Promise<ProjectItem>;
    readonly name: string;
    readonly guid: string;
  }

  // ──────────────────────────────────────────────────────────────────────
  // PROJECT ITEM
  // ──────────────────────────────────────────────────────────────────────

  export interface ProjectItem {
    readonly name: string;
    readonly nodeId: string;
  }

  // ──────────────────────────────────────────────────────────────────────
  // PROJECT
  // ──────────────────────────────────────────────────────────────────────

  export interface ProjectStatic {
    getActiveProject(): Promise<Project>;
  }

  export interface Project {
    getActiveSequence(): Promise<Sequence>;
    lockedAccess<T>(callback: () => T): Promise<T>;
    executeTransaction(callback: (tx: Transaction) => void, label: string): void;
    readonly name: string;
    readonly path: string;
  }

  // ──────────────────────────────────────────────────────────────────────
  // MODULE ROOT  (the object returned by require("premierepro"))
  // ──────────────────────────────────────────────────────────────────────

  export interface PremierePro {
    Project: ProjectStatic;
    TickTime: TickTimeStatic;
    TrackItemSelection: TrackItemSelectionStatic;
    Constants: ConstantsType;
    Utils: UtilsType;
  }
}
