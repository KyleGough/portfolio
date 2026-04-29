/**
 * Shared "mission elapsed" time for the home hero: telemetry (T+ clock) and the
 * Falcon wireframe (booster plume schedule) use the same formula.
 *
 * - Clock starts at T+ 0:00.0 on first paint
 * - Mission time advances 0.85 s per 1.0 s wall (decorative)
 */

/** Base mission elapsed time (s) for T+ display: T+0 at load */
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
 * Horizontal, vertical, and roll separation eases in over this wall time from T+1.
 * Shorter = boosters “reach” splay/offset faster.
 */
export const BOOSTER_SEP_DURATION_MS = 8000;

/**
 * T+1:00 — main-stage split: top stack stays put; lower first stage falls and the whole
 * lower body (tank, octoweb, plumes) fades out in this wall time.
 */
export const CORE_STAGING_AT_MISSION_SEC = 60;

/** Wall time for lower-stage fall (ease) and 1 → 0 fade (plumes + wireframe). */
export const CORE_BOTTOM_STAGING_WALL_MS = 8000;

/**
 * T+1:02 — second-stage (single) engine plume: opacity 0 → 1 (mission clock), after main
 * stack separation (T+1:02 = 62 s in `getMissionSec` time base).
 */
export const S2_PLUME_AT_MISSION_SEC = 60 + 2;

/**
 * Ease the S2 plume in over this wall time from T+1:02.
 */
export const S2_PLUME_FADEIN_WALL_MS = 1200;

export const getMissionSec = (wallSecSinceStart: number): number =>
  MISSION_T0 + wallSecSinceStart * MISSION_RATE;

/**
 * Falcon wireframe loop: mission timeline repeats every `LOOP_PERIOD_MISSION_SEC`.
 * T+1:05 — upper stack exits; T+1:10 — full reset + fade-in from T+0.
 */
export const LOOP_PERIOD_MISSION_SEC = 60 + 10; // 70 — T+1:10 (rocket loop reset)

/** Upper stack (S2 + fairing) rises + fades out from this mission second (T+1:05). */
export const LOOP_UPPER_EXIT_START_MISSION_SEC = 60 + 5; // 65 — T+1:05

/** Flight telemetry fuel gauge: 100% at loop start → this % at loop reset (same instant as wireframe). */
export const TELEMETRY_FUEL_MIN_PCT = 9;

/** Fade entire rocket in over this many mission seconds after each loop reset (from T+0). */
export const LOOP_FADE_IN_MISSION_SEC = 5;
