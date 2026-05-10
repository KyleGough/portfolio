/**
 * Mission elapsed time for the Falcon wireframe: plume schedule, staging, and loop
 * reset share this timeline.
 *
 * - Timeline starts at T+ 0:00.0 on first paint
 * - Mission time advances 1 s per 1 s wall
 */

/** Base mission elapsed time (s); T+0 at load */
export const MISSION_T0 = 0;

/** Mission rate: 1 s per 1 s wall */
export const MISSION_RATE = 1;

/** Booster engine plumes begin fade when mission clock passes T+0:30 */
export const BOOSTER_FADE_AT_MISSION_SEC = 30;

/** Booster plume mesh opacity: 0 over this wall time from T+1. */
export const BOOSTER_FADE_WALL_MS = 2500;

/**
 * Side-booster wire + strut opacity: 0 at end of this wall time from T+1.
 */
export const BOOSTER_WIREFRAME_FADE_WALL_MS = 4000;

/**
 * Extra wall time before plume / wire opacity start falling (after separation event arms).
 * Separation motion still uses elapsed time since the booster event with no offset.
 * Each fade’s ramp is shortened by this same amount so full transparency still lines up with
 * the original schedule (plume done at `BOOSTER_FADE_WALL_MS`, wire at `BOOSTER_WIREFRAME_FADE_WALL_MS`).
 */
export const BOOSTER_VISUAL_FADE_DELAY_MS = 1000;

/**
 * Horizontal, vertical, and roll separation eases in over this wall time from T+1.
 * Shorter = boosters “reach” splay/offset faster.
 */
export const BOOSTER_SEP_DURATION_MS = 8000;

/** Length of the first N₂ / GN₂ separation-thruster puff (wall ms). */
export const BOOSTER_SEP_THRUSTER_BURST_MS = 500;

/**
 * Length of the second puff — typically longer (sustain) after the initial valve pop / gap.
 */
export const BOOSTER_SEP_THRUSTER_BURST_2_MS = 2500;

/** Gap between the two bursts (wall ms). */
export const BOOSTER_SEP_THRUSTER_BURST_GAP_MS = 200;

/**
 * N₂ separation thrusters: intensity 0–1 driven by wall clock since the booster-separation event
 * arms ({@link BOOSTER_FADE_AT_MISSION_SEC}). Two pulses:
 * `[0,T1)`, `[T1+G, T1+G+T2)` with {@link BOOSTER_SEP_THRUSTER_BURST_MS} and
 * {@link BOOSTER_SEP_THRUSTER_BURST_2_MS}.
 */
export const separationThrusterBurstMul = (
  now: number,
  separationEventWallMs: number | null,
): number => {
  if (separationEventWallMs === null) {
    return 0;
  }
  const t = now - separationEventWallMs;
  const burst1 = BOOSTER_SEP_THRUSTER_BURST_MS;
  const burst2 = BOOSTER_SEP_THRUSTER_BURST_2_MS;
  const gap = BOOSTER_SEP_THRUSTER_BURST_GAP_MS;
  const envelope = (u: number, burstLen: number): number => {
    if (u <= 0 || u >= burstLen) {
      return 0;
    }
    const edge = Math.min(120, burstLen / 5);
    if (u < edge) {
      return u / edge;
    }
    if (u > burstLen - edge) {
      return (burstLen - u) / edge;
    }
    return 1;
  };
  if (t >= 0 && t < burst1) {
    return envelope(t, burst1);
  }
  const t2Start = burst1 + gap;
  if (t >= t2Start && t < t2Start + burst2) {
    return envelope(t - t2Start, burst2);
  }
  return 0;
};

/**
 * T+0:50 — main-stage split: top stack stays put; lower first stage falls and the whole
 * lower body (tank, octoweb, plumes) fades out in this wall time.
 */
export const CORE_STAGING_AT_MISSION_SEC = 50;

/** Wall time for lower-stage fall (ease) and 1 → 0 fade (plumes + wireframe). */
export const CORE_BOTTOM_STAGING_WALL_MS = 8000;

/**
 * T+0:52 — second-stage (single) engine plume: opacity 0 → 1 (mission clock), after main
 * stack separation (T+0:52 = 52 s in `getMissionSec` time base).
 */
export const S2_PLUME_AT_MISSION_SEC = 50 + 2;

/**
 * Ease the S2 plume in over this wall time from T+1:02.
 */
export const S2_PLUME_FADEIN_WALL_MS = 1200;

export const getMissionSec = (wallSecSinceStart: number): number =>
  MISSION_T0 + wallSecSinceStart * MISSION_RATE;

/**
 * Falcon wireframe loop: mission timeline repeats every `LOOP_PERIOD_MISSION_SEC`.
 * T+0:55 — upper stack exits; T+1:00 — full reset + fade-in from T+0.
 */
export const LOOP_PERIOD_MISSION_SEC = 60; // T+1:00 (rocket loop reset)

/** Upper stack (S2 + fairing) rises + fades out from this mission second (T+0:55). */
export const LOOP_UPPER_EXIT_START_MISSION_SEC = 55; // T+0:55

/** Fade entire rocket in over this many mission seconds after each loop reset (from T+0). */
export const LOOP_FADE_IN_MISSION_SEC = 5;
