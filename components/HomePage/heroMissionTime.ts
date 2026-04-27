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

export const HERO_BOOSTER_FADE_WALL_MS = 5000;

export function getHeroMissionSec(wallSecSinceStart: number): number {
  return HERO_MISSION_T0 + wallSecSinceStart * HERO_MISSION_RATE;
}
