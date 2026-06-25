// host.jsx — Premiere Pro ExtendScript
// Loaded by CEP when the panel opens. All public functions are accessible
// from the panel via window.__adobe_cep__.evalScript().

// ── Config ────────────────────────────────────────────────────────────────────

var MOTION_MATCH  = ["AE.ADBE Motion",  "ADBE Motion"];
var OPACITY_MATCH = ["AE.ADBE Opacity", "ADBE Opacity"];

// Parameter indices within the Motion component (locale-independent)
var PIDX = { POSITION: 0, SCALE: 1, ROTATION: 4 };

// Keyframe interpolation constants — use named globals if available, else numeric fallback
var KF_BEZIER = (typeof kfInterpolationTypeBezier !== "undefined") ? kfInterpolationTypeBezier : 1;
var KF_LINEAR = (typeof kfInterpolationTypeLinear !== "undefined") ? kfInterpolationTypeLinear : 0;
var KF_HOLD   = (typeof kfInterpolationTypeHold   !== "undefined") ? kfInterpolationTypeHold   : 3;

// ── Sequence helpers ──────────────────────────────────────────────────────────

function _getSeq() {
    return (app && app.project && app.project.activeSequence) || null;
}

// seq.timebase = ticks per frame; 254 016 000 000 ticks per second
function _getFPS(seq) {
    var tb = parseInt(seq.timebase, 10);
    return (tb > 0) ? (254016000000 / tb) : 24;
}

function _makeTime(seconds) {
    var t = new Time();
    t.seconds = seconds;
    return t;
}

// ── Clip selection ────────────────────────────────────────────────────────────

function _getSelectedVideoClips() {
    var seq = _getSeq();
    if (!seq) return [];
    var result = [];
    var tracks = seq.videoTracks;
    for (var t = 0; t < tracks.numTracks; t++) {
        var clips = tracks[t].clips;
        for (var c = 0; c < clips.numItems; c++) {
            var clip = clips[c];
            var isSelected = (typeof clip.isSelected === "function")
                ? clip.isSelected()
                : Boolean(clip.selected);
            if (isSelected) result.push(clip);
        }
    }
    return result;
}

// ── Component + parameter access ──────────────────────────────────────────────

function _findComp(clip, matchNames) {
    var comps = clip.components;
    for (var i = 0; i < comps.numItems; i++) {
        var comp = comps.getComponentAtIndex(i);
        for (var j = 0; j < matchNames.length; j++) {
            if (comp.matchName === matchNames[j]) return comp;
        }
    }
    return null;
}

function _getParamAtIndex(comp, idx) {
    var props = comp.properties;
    // Try direct bracket access (array-like), then method-based
    if (props[idx] !== undefined && props[idx] !== null) return props[idx];
    if (typeof props.getParameterAtIndex === "function") return props.getParameterAtIndex(idx);
    return null;
}

function _getParam(clip, paramType) {
    switch (paramType) {
        case "scale":
            var mc = _findComp(clip, MOTION_MATCH);
            return mc ? _getParamAtIndex(mc, PIDX.SCALE) : null;
        case "rotation":
            var mc2 = _findComp(clip, MOTION_MATCH);
            return mc2 ? _getParamAtIndex(mc2, PIDX.ROTATION) : null;
        case "position":
            var mc3 = _findComp(clip, MOTION_MATCH);
            return mc3 ? _getParamAtIndex(mc3, PIDX.POSITION) : null;
        case "opacity":
            var oc = _findComp(clip, OPACITY_MATCH);
            return oc ? _getParamAtIndex(oc, 0) : null;
        default:
            return null;
    }
}

// ── Keyframe helpers ──────────────────────────────────────────────────────────

function _interp(mode) {
    if (mode === "LINEAR") return KF_LINEAR;
    if (mode === "HOLD")   return KF_HOLD;
    return KF_BEZIER; // BEZIER / EASE_IN / EASE_OUT all fall back to Bezier
}

function _addKf(param, seconds, value, interpMode) {
    var t = _makeTime(seconds);
    try   { param.addKey(t); }             catch(e) {}
    param.setValueAtKey(t, value, false);
    try   { param.setInterpolationTypeAtKey(t, _interp(interpMode), false); } catch(e) {}
}

// ── Keyframe transformation ───────────────────────────────────────────────────

function _reverseKfs(kfs, duration) {
    // Copy and reverse
    var rev = [];
    for (var i = kfs.length - 1; i >= 0; i--) {
        rev.push({ frame: kfs[i].frame, value: kfs[i].value, interpolation: kfs[i].interpolation });
    }
    var n = rev.length;
    for (var j = 0; j < n; j++) {
        rev[j].frame = (n > 1) ? Math.round((j / (n - 1)) * duration) : 0;
    }
    return rev;
}

function _scaleKfs(kfs, fromDur, toDur) {
    if (fromDur === 0) return kfs;
    var out = [];
    for (var i = 0; i < kfs.length; i++) {
        out.push({
            frame:         Math.round((kfs[i].frame / fromDur) * toDur),
            value:         kfs[i].value,
            interpolation: kfs[i].interpolation
        });
    }
    return out;
}

// ── Public: getClipInfoJSON ───────────────────────────────────────────────────

function getClipInfoJSON() {
    try {
        var seq = _getSeq();
        if (!seq) return JSON.stringify({ count: 0, clips: [] });
        var fps   = _getFPS(seq);
        var clips = _getSelectedVideoClips();
        var infos = [];
        for (var i = 0; i < clips.length; i++) {
            infos.push({
                index:         i,
                name:          clips[i].name || ("Klip " + (i + 1)),
                durationFrames: Math.round(clips[i].duration.seconds * fps)
            });
        }
        return JSON.stringify({ count: infos.length, clips: infos });
    } catch(e) {
        return JSON.stringify({ count: 0, clips: [], error: String(e) });
    }
}

// ── Public: applyTransitionJSON ───────────────────────────────────────────────

function applyTransitionJSON(presetJSON, optionsJSON) {
    try {
        var preset  = JSON.parse(presetJSON);
        var options = JSON.parse(optionsJSON);

        var seq = _getSeq();
        if (!seq) return JSON.stringify({ success: false, message: "Brak aktywnej sekwencji" });

        var fps  = _getFPS(seq);
        var seqW = seq.frameSizeHorizontal || 1920;
        var seqH = seq.frameSizeVertical   || 1080;

        var clips = _getSelectedVideoClips();
        if (clips.length === 0) {
            return JSON.stringify({ success: false, message: "Nie wybrano klipu wideo na osi czasu" });
        }

        var applied = 0;
        var errors  = [];

        try { app.beginUndoGroup("Quick Transitions: " + preset.name); } catch(e) {}

        for (var ci = 0; ci < clips.length; ci++) {
            var clip       = clips[ci];
            var clipFrames = Math.round(clip.duration.seconds * fps);

            var tranFrames = (options.durationFrames !== null && options.durationFrames !== undefined)
                ? options.durationFrames
                : Math.round((preset.duration * fps) / 24);

            if (tranFrames >= clipFrames) {
                errors.push("Klip " + (ci + 1) + ": zbyt krótki (" + clipFrames + "f) dla " + tranFrames + "f przejścia");
                continue;
            }

            var winStart  = (options.placement === "beginning") ? 0 : (clipFrames - tranFrames);
            var clipInSec = clip.inPoint.seconds;

            for (var pi = 0; pi < preset.parameters.length; pi++) {
                var paramAnim = preset.parameters[pi];
                var param     = _getParam(clip, paramAnim.param);
                if (!param) continue;

                // Copy keyframe definitions
                var kfDefs = [];
                for (var ki = 0; ki < paramAnim.keyframes.length; ki++) {
                    kfDefs.push(paramAnim.keyframes[ki]);
                }

                if (options.placement === "end") {
                    kfDefs = _reverseKfs(kfDefs, preset.duration);
                }
                kfDefs = _scaleKfs(kfDefs, preset.duration, tranFrames);

                for (var kk = 0; kk < kfDefs.length; kk++) {
                    var kf      = kfDefs[kk];
                    var absFr   = winStart + kf.frame;
                    var timeSec = clipInSec + (absFr / fps);

                    var value;
                    if (typeof kf.value === "number") {
                        value = kf.value;
                    } else {
                        // Position offset {xRatio, yRatio} → absolute pixel [x, y]
                        value = [
                            seqW / 2 + kf.value.xRatio * seqW,
                            seqH / 2 + kf.value.yRatio * seqH
                        ];
                    }

                    _addKf(param, timeSec, value, kf.interpolation);
                }
            }
            applied++;
        }

        try { app.endUndoGroup(); } catch(e) {}

        if (applied === 0) {
            return JSON.stringify({ success: false, message: errors.join("; ") || "Nie udało się zastosować przejścia" });
        }

        var suffix = (clips.length > 1) ? (" na " + applied + "/" + clips.length + " klipach") : "";
        return JSON.stringify({ success: true, message: "Zastosowano \"" + preset.name + "\"" + suffix });

    } catch(e) {
        try { app.endUndoGroup(); } catch(_e) {}
        return JSON.stringify({ success: false, message: String(e) });
    }
}
