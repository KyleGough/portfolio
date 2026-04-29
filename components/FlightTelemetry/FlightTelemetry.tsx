import { getHeroMissionSec } from '@components/Rocket/heroMissionTime';
import React, { useEffect, useMemo, useState } from 'react';

import styles from './FlightTelemetry.module.css';

const TICK_MS = 120;

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

const useSimTime = (): number => {
  const [t, setT] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    const id = window.setInterval(() => {
      setT((prev) => prev + TICK_MS / 1000);
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, []);

  return t;
};

/**
 * Mock flight telemetry in three separate windown:
 * Clock/propellant, velocity/trace, pitch/roll.
 */
export const FlightTelemetry: React.FC = () => {
  const t = useSimTime();

  const { missionSec, fuelPct, vrel, pitch, roll, chartPoints, pitchX, rollX } =
    useMemo(() => {
      const missionSec = getHeroMissionSec(t);
      /* Monotonic drain only — no upward wobble (LOX/CH4) */
      const fuelPct = Math.max(5, 80 - t * 0.2);

      const vrel = Math.round(
        1820 + 55 * Math.sin(t * 0.22) + 20 * Math.cos(t * 0.4)
      );

      const pitch = 12 + 2.1 * Math.sin(t * 0.31) + 0.6 * Math.sin(t * 0.9);
      const roll = -0.4 + 0.9 * Math.cos(t * 0.37) + 0.25 * Math.sin(t * 1.1);

      const n = 11;
      const points: string[] = [];
      for (let i = 0; i < n; i += 1) {
        const x = (i / (n - 1)) * 100;
        const yNorm =
          0.5 +
          0.4 * Math.sin(t * 0.28 + i * 0.45) +
          0.12 * Math.sin(t * 0.5 + i * 1.2);
        const y = clamp(
          2 + (1 - yNorm) * 16 + Math.sin(t * 0.2 + i) * 0.5,
          0.5,
          19.2
        );
        points.push(`${x},${y.toFixed(2)}`);
      }

      const pitchX = clamp(50 + (pitch / 22) * 38, 6, 94);
      const rollX = clamp(50 + (roll / 1.4) * 28, 6, 94);

      return {
        missionSec,
        fuelPct,
        vrel,
        pitch,
        roll,
        chartPoints: points.join(' '),
        pitchX,
        rollX,
      };
    }, [t]);

  const fmtDeg = (deg: number) =>
    (deg >= 0 ? '+' : '−') + Math.abs(deg).toFixed(1);
  const pitchStr = fmtDeg(pitch);
  const rollStr = fmtDeg(roll);

  return (
    <div className={styles.root} aria-hidden>
      <section className={styles.window} aria-hidden>
        <h2 className={styles.windowHeader}>Clk · prop</h2>
        <p className={styles.clock}>{formatTPlus(missionSec)}</p>
        <div className={styles.block}>
          <div className={styles.labelRow}>
            <span className={styles.label}>LOX / CH4</span>
            <span className={styles.value}>{fuelPct.toFixed(0)}%</span>
          </div>
          <div className={styles.meter}>
            <div
              className={styles.meterFill}
              style={{ width: `${fuelPct}%` }}
            />
          </div>
        </div>
      </section>

      <section className={styles.window} aria-hidden>
        <h2 className={styles.windowHeader}>Nav · inertial</h2>
        <div className={styles.block}>
          <div className={styles.labelRow}>
            <span className={styles.label}>Vrel</span>
            <span className={styles.value}>
              {vrel.toLocaleString('en-GB', { useGrouping: true })}
              <span className={styles.units}>m·s⁻¹</span>
            </span>
          </div>
          <svg
            className={styles.chart}
            viewBox="0 0 100 20"
            xmlns="http://www.w3.org/2000/svg"
            overflow="visible"
            aria-hidden
          >
            <line
              x1="0"
              y1="20"
              x2="0"
              y2="0"
              stroke="currentColor"
              strokeOpacity="0.12"
              strokeWidth="0.4"
            />
            <line
              x1="0"
              y1="0"
              x2="100"
              y2="0"
              stroke="currentColor"
              strokeOpacity="0.1"
              strokeWidth="0.3"
            />
            <line
              x1="0"
              y1="20"
              x2="100"
              y2="20"
              stroke="currentColor"
              strokeOpacity="0.1"
              strokeWidth="0.3"
            />
            <polyline
              fill="none"
              points={chartPoints}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="0.65"
              opacity="0.9"
            />
          </svg>
        </div>
      </section>

      <section className={styles.window} aria-hidden>
        <h2 className={styles.windowHeader}>GNC · att</h2>
        <div className={styles.pitchRow}>
          <div>
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
          <div>
            <div className={styles.labelRow}>
              <span className={styles.label}>Roll</span>
              <span className={styles.value}>{rollStr}°</span>
            </div>
            <div className={styles.minitrim}>
              <div
                className={styles.minitrimTick}
                style={{ left: `${rollX}%` }}
              />
            </div>
          </div>
        </div>
        <p className={styles.footnote}>sim · not live</p>
      </section>
    </div>
  );
};
