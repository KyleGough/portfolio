import { useHeroAnimationActive } from '@components/Hero/HeroAnimationContext';
import {
  getMissionSec,
  LOOP_PERIOD_MISSION_SEC,
  TELEMETRY_FUEL_MIN_PCT,
} from '@components/Rocket/MissionTime';
import { useHeroTelemetryWallSeconds } from '@hooks/useHeroTelemetryWallSeconds';
import React, { useMemo } from 'react';

import styles from './FlightTelemetry.module.css';

const formatTPlus = (totalSec: number): string => {
  const h = Math.floor(totalSec / 3600);
  const rem1 = totalSec - h * 3600;
  const m = Math.floor(rem1 / 60);
  const s = rem1 - m * 60;
  return `T+ ${h}:${String(m).padStart(2, '0')}:${s
    .toFixed(1)
    .padStart(4, '0')}`;
};

const clamp = (n: number, a: number, b: number): number => {
  return Math.min(b, Math.max(a, n));
};

/** Relative velocity at T+0 → `VREL_LOOP_MAX` m·s⁻¹ at end of each rocket loop. */
const VREL_LOOP_MAX = 3489;

const vrelForRocketLoop = (phaseMissionSec: number): number => {
  const u = clamp(phaseMissionSec / LOOP_PERIOD_MISSION_SEC, 0, 1);
  return Math.round(u * VREL_LOOP_MAX);
};

/** Pitch angle 0° at T+0 → 40° at end of each rocket loop. */
const PITCH_LOOP_MAX_DEG = 40;

const pitchForRocketLoop = (phaseMissionSec: number): number => {
  const u = clamp(phaseMissionSec / LOOP_PERIOD_MISSION_SEC, 0, 1);
  return u * PITCH_LOOP_MAX_DEG;
};

/** 100% at T+0 each cycle → `TELEMETRY_FUEL_MIN_PCT` at end of cycle; wraps with rocket reset. */
const fuelPctForRocketLoop = (missionSec: number): number => {
  const period = LOOP_PERIOD_MISSION_SEC;
  const phaseSec = missionSec - Math.floor(missionSec / period) * period;
  const u = clamp(phaseSec / period, 0, 1);
  return 100 + (TELEMETRY_FUEL_MIN_PCT - 100) * u;
};

/**
 * Mock flight telemetry: T+ (row 1), then LOX/CH4, Vrel, pitch (row 2, three columns).
 */
export const FlightTelemetry: React.FC = () => {
  const animationActive = useHeroAnimationActive();
  const t = useHeroTelemetryWallSeconds(animationActive);

  const { missionSec, fuelPctDisplay, vrel, pitch, pitchX } = useMemo(() => {
    const wallMissionSec = getMissionSec(t);
    const missionSec =
      wallMissionSec -
      Math.floor(wallMissionSec / LOOP_PERIOD_MISSION_SEC) *
        LOOP_PERIOD_MISSION_SEC;
    const fuelPct = fuelPctForRocketLoop(wallMissionSec);
    const fuelPctDisplay = Number(fuelPct.toFixed(0));

    const vrel = vrelForRocketLoop(missionSec);

    const pitch = pitchForRocketLoop(missionSec);

    const pitchX = clamp(6 + (pitch / PITCH_LOOP_MAX_DEG) * 88, 6, 94);

    return {
      missionSec,
      fuelPctDisplay,
      vrel,
      pitch,
      pitchX,
    };
  }, [t]);

  const fmtDeg = (deg: number) =>
    (deg >= 0 ? '+' : '−') + Math.abs(deg).toFixed(1);
  const pitchStr = fmtDeg(pitch);

  return (
    <div className={styles.root} aria-hidden>
      <div className={styles.clockRow}>
        <p className={styles.clock}>{formatTPlus(missionSec)}</p>
      </div>

      <section className={`${styles.window} ${styles.cellFuel}`} aria-hidden>
        <div className={styles.windowPane}>
          <div className={styles.fuelColumn}>
            <div className={styles.labelRow}>
              <span className={styles.label}>LOX/CH4</span>
              <span className={styles.value}>{fuelPctDisplay}%</span>
            </div>
            <div className={styles.meter}>
              <div
                className={styles.meterFill}
                style={{ width: `${fuelPctDisplay}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.window} ${styles.cellVrel}`} aria-hidden>
        <div className={styles.windowPane}>
          <div className={`${styles.labelRow} ${styles.labelRowInline}`}>
            <span className={styles.label}>Vrel</span>
            <span className={styles.value}>
              {vrel.toLocaleString('en-GB', { useGrouping: true })}
              <span className={styles.units}>m·s⁻¹</span>
            </span>
          </div>
        </div>
      </section>

      <section className={`${styles.window} ${styles.cellPitch}`} aria-hidden>
        <div className={styles.windowPane}>
          <div className={styles.labelRow}>
            <span className={styles.label}>Pitch</span>
            <span className={styles.value}>{pitchStr}°</span>
          </div>
          <div className={styles.minitrim}>
            <div
              className={styles.minitrimTick}
              style={{ left: `${pitchX}%` }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};
