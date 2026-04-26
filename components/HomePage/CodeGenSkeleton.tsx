import React, { useMemo } from 'react';

import styles from './CodeGenSkeleton.module.css';

/** Deterministic flex-grow values for skeleton bar widths (no real code). */
const ROW_FLEX: number[][] = [
  [1.1, 0.9],
  [0.5, 1.6, 0.4],
  [1.4, 0.7],
  [0.35, 1.2, 0.55],
  [1.8, 0.45],
  [0.6, 0.9, 0.7],
  [1.0, 1.1],
  [0.45, 1.35, 0.5],
  [1.2, 0.65, 0.4],
  [0.8, 1.0],
  [0.55, 0.7, 0.85],
  [1.5, 0.5],
  [0.4, 1.1, 0.65],
  [1.3, 0.75],
  [0.65, 0.55, 1.0],
  [1.0, 0.9, 0.35],
  [0.5, 1.45],
  [1.15, 0.6, 0.45],
  [0.7, 1.0],
  [0.4, 0.85, 0.9],
  [1.6, 0.55],
  [0.55, 0.5, 1.2],
  [1.05, 0.95],
  [0.48, 1.25, 0.52],
  [1.35, 0.7],
  [0.62, 0.88, 0.65],
  [0.9, 1.15],
  [1.2],
];

const LINE_COUNT = ROW_FLEX.length;

/** Hue spread for skeleton bars (muted, space-gothic adjacent). */
function tokenHue(globalIndex: number): number {
  return 248 + (globalIndex * 17) % 72;
}

function SkeletonBlock({ blockKey }: { blockKey: string }) {
  let globalToken = 0;

  return (
    <div className={styles.blockWrap}>
      {ROW_FLEX.map((flexes, rowIndex) => (
        <div
          key={`${blockKey}-r${rowIndex}`}
          className={styles.lineShell}
        >
          <div className={styles.line} aria-hidden>
            {flexes.map((flex, j) => {
              const g = globalToken;
              globalToken += 1;
              return (
                <span
                  key={j}
                  className={styles.token}
                  style={
                    {
                      flexGrow: flex,
                      flexBasis: 0,
                      '--hue': tokenHue(g),
                    } as React.CSSProperties
                  }
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Abstract code skeleton: scrolls vertically; line bars are static (no typing animation). */
export const CodeGenSkeleton: React.FC = () => {
  const rootStyle = useMemo(
    () =>
      ({
        '--line-count': LINE_COUNT,
      }) as React.CSSProperties,
    []
  );

  return (
    <div className={styles.root} style={rootStyle} aria-hidden>
      <div className={styles.viewport}>
        <div className={styles.track}>
          <SkeletonBlock blockKey="a" key="a" />
          <SkeletonBlock blockKey="b" key="b" />
        </div>
      </div>
    </div>
  );
};
