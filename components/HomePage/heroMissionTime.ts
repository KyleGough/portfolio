/**
 * Shared "mission elapsed" time for the home hero: telemetry (T+ clock) and the
 * Falcon wireframe (booster plume schedule) use the same formula.
 *
 * - Clock starts at T+ 0:1:00.0 on first paint
 * - Mission time advances 0.85 s per 1.0 s wall (decorative)
 */

/** Base mission elapsed time (s) for T+ display: one minute = T+1:00 */
export const HERO_MISSION_T0 = 60;

export const HERO_MISSION_RATE = 0.85;

/** Booster engine plumes begin fade when mission clock passes T+2:00.0 (120 s) */
export const HERO_BOOSTER_FADE_AT_MISSION_SEC = 120;

/** Booster plume mesh opacity: 0 over this wall time from T+2. */
export const HERO_BOOSTER_FADE_WALL_MS = 3500;

/**
 * Side-booster wire + strut opacity: 0 at end of this wall time from T+2.
 */
export const HERO_BOOSTER_WIREFRAME_FADE_WALL_MS = 5000;

/**
 * Horizontal, vertical, and roll separation eases in over this wall time from T+2.
 * Shorter = boosters “reach” splay/offset faster.
 */
export const HERO_BOOSTER_SEP_DURATION_MS = 5000;

/**
 * T+3:00 — main-stage split: top stack stays put; lower first stage falls and the whole
 * lower body (tank, octoweb, plumes) fades out in this wall time.
 */
export const HERO_CORE_STAGING_AT_MISSION_SEC = 3 * 60; // 180 s

/** Wall time for T+3 lower-stage fall (ease) and 1 → 0 fade (plumes + wireframe). */
export const HERO_CORE_BOTTOM_STAGING_WALL_MS = 5000;

/**
 * T+3:02 — second-stage (single) engine plume: opacity 0 → 1 (mission clock), after main
 * stack separation (T+3:00 = 180 s in `getHeroMissionSec` time base).
 */
export const HERO_S2_PLUME_AT_MISSION_SEC = 3 * 60 + 2;

/**
 * Ease the S2 plume in over this wall time from T+3:05.
 */
export const HERO_S2_PLUME_FADEIN_WALL_MS = 1200;

export function getHeroMissionSec(wallSecSinceStart: number): number {
  return HERO_MISSION_T0 + wallSecSinceStart * HERO_MISSION_RATE;
}
