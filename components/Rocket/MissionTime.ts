/**
 * Shared "mission elapsed" time for the home hero: telemetry (T+ clock) and the
 * Falcon wireframe (booster plume schedule) use the same formula.
 *
 * - Clock starts at T+ 0:00.0 on first paint
 * - Mission time advances 0.85 s per 1.0 s wall (decorative)
 */

/** Base mission elapsed time (s) for T+ display: T+0 at load */
export const MISSION_T0 = 0;

export const MISSION_RATE = 1;

/** Booster engine plumes begin fade when mission clock passes T+1:00.0 (60 s) */
export const BOOSTER_FADE_AT_MISSION_SEC = 60;

/** Booster plume mesh opacity: 0 over this wall time from T+1. */
export const BOOSTER_FADE_WALL_MS = 3000;

/**
 * Side-booster wire + strut opacity: 0 at end of this wall time from T+1.
 */
export const BOOSTER_WIREFRAME_FADE_WALL_MS = 4000;

/**
 * Horizontal, vertical, and roll separation eases in over this wall time from T+1.
 * Shorter = boosters “reach” splay/offset faster.
 */
export const BOOSTER_SEP_DURATION_MS = 4000;

/**
 * T+2:00 — main-stage split: top stack stays put; lower first stage falls and the whole
 * lower body (tank, octoweb, plumes) fades out in this wall time.
 */
export const CORE_STAGING_AT_MISSION_SEC = 2 * 60; // 120 s

/** Wall time for T+2 lower-stage fall (ease) and 1 → 0 fade (plumes + wireframe). */
export const CORE_BOTTOM_STAGING_WALL_MS = 5000;

/**
 * T+2:02 — second-stage (single) engine plume: opacity 0 → 1 (mission clock), after main
 * stack separation (T+2:00 = 120 s in `getMissionSec` time base).
 */
export const S2_PLUME_AT_MISSION_SEC = 2 * 60 + 2;

/**
 * Ease the S2 plume in over this wall time from T+2:02.
 */
export const S2_PLUME_FADEIN_WALL_MS = 1200;

export const getMissionSec = (wallSecSinceStart: number): number =>
  MISSION_T0 + wallSecSinceStart * MISSION_RATE;
