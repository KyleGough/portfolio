import { Link } from '@components/Link';
import React, { useId, useMemo } from 'react';

import styles from './HomeHeroVariants.module.css';

const INTRO =
  "Hello, I'm Kyle, a Senior Front-End Engineer at Ripjar. I have a Master of Engineering degree from Warwick University. My interests lie in cycling, guitar, movies, and physics (cosmology and quantum mechanics). I enjoy learning and acquiring new skills and putting them into practice. Currently I am learning Three.js, and hope to apply these newly acquired skills on this website.";

const VB = { w: 400, h: 280 };

/** Mass locations: twin wells warp the spacetime grid below */
const WELLS = [
  { cx: 124, cy: 98, amp: 28, spread: 4400 },
  { cx: 276, cy: 98, amp: 28, spread: 4400 },
] as const;

function warp(x: number, y: number): { x: number; y: number } {
  let dx = 0;
  let dy = 0;
  for (const w of WELLS) {
    const ox = x - w.cx;
    const oy = y - w.cy;
    const d2 = ox * ox + oy * oy;
    const g = w.amp * Math.exp(-d2 / w.spread);
    dy += g * (0.26 + 0.0065 * Math.max(0, y - 65));
    dx += (ox / (Math.sqrt(d2) + 14)) * g * 0.11;
  }
  return { x: x + dx, y: y + dy };
}

function linePath(pts: { x: number; y: number }[]): string {
  return pts
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(' ');
}

function horizontalGridPath(y0: number): string {
  const pts: { x: number; y: number }[] = [];
  for (let x = 0; x <= VB.w; x += 5) {
    pts.push(warp(x, y0));
  }
  return linePath(pts);
}

function verticalGridPath(x0: number): string {
  const pts: { x: number; y: number }[] = [];
  for (let y = 36; y <= VB.h; y += 5) {
    pts.push(warp(x0, y));
  }
  return linePath(pts);
}

const EntanglementHeroGraphic: React.FC = () => {
  const rid = useId().replace(/:/g, '');

  const { hLines, vLines } = useMemo(() => {
    const h: number[] = [];
    for (let y = 158; y <= VB.h + 6; y += 10) {
      h.push(y);
    }
    const v: number[] = [];
    for (let x = 28; x <= VB.w - 28; x += 36) {
      v.push(x);
    }
    return { hLines: h, vLines: v };
  }, []);

  return (
    <div
      className={styles.graphic}
      role="img"
      aria-label="Animation: two entangled quantum cores linked by an energy channel, bending a cyan spacetime grid beneath them."
    >
      <div className={styles.quantumFrame}>
        <svg
          className={styles.quantumScene}
          viewBox={`0 0 ${VB.w} ${VB.h}`}
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
        >
          <defs>
            <radialGradient id={`core-${rid}`} cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="oklch(92% 0.14 70)" />
              <stop offset="45%" stopColor="oklch(78% 0.2 55)" />
              <stop offset="100%" stopColor="oklch(52% 0.18 45 / 0.15)" />
            </radialGradient>
            <linearGradient
              id={`beam-${rid}`}
              gradientUnits="userSpaceOnUse"
              x1="124"
              x2="276"
              y1="98"
              y2="98"
            >
              <stop offset="0%" stopColor="oklch(75% 0.2 50 / 0.15)" />
              <stop offset="35%" stopColor="oklch(88% 0.16 58 / 0.85)" />
              <stop offset="65%" stopColor="oklch(88% 0.16 58 / 0.85)" />
              <stop offset="100%" stopColor="oklch(75% 0.2 50 / 0.15)" />
            </linearGradient>
            <radialGradient id={`voidGlow-${rid}`} cx="50%" cy="35%" r="75%">
              <stop offset="0%" stopColor="oklch(28% 0.1 285 / 0.35)" />
              <stop offset="55%" stopColor="oklch(12% 0.04 280 / 0.2)" />
              <stop offset="100%" stopColor="oklch(8% 0.03 275 / 0)" />
            </radialGradient>
            <filter
              id={`coreGlow-${rid}`}
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur
                in="SourceGraphic"
                result="b"
                stdDeviation="1.8"
              />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id={`vig-${rid}`} cx="50%" cy="38%" r="72%">
              <stop offset="42%" stopColor="oklch(8% 0.03 275 / 0)" />
              <stop offset="100%" stopColor="oklch(5% 0.02 280 / 0.82)" />
            </radialGradient>
          </defs>

          <rect
            className={styles.sceneVoid}
            height={VB.h}
            width={VB.w}
            x="0"
            y="0"
          />
          <rect
            fill={`url(#voidGlow-${rid})`}
            height={VB.h}
            width={VB.w}
            x="0"
            y="0"
          />

          <g className={styles.gridGroup}>
            {hLines.map((y0) => (
              <path
                key={`gh-${y0}`}
                className={styles.gridLineH}
                d={horizontalGridPath(y0)}
                fill="none"
              />
            ))}
            {vLines.map((x0) => (
              <path
                key={`gv-${x0}`}
                className={styles.gridLineV}
                d={verticalGridPath(x0)}
                fill="none"
              />
            ))}
          </g>

          <path
            className={styles.beamPath}
            d="M 166 98 Q 200 90 234 98"
            fill="none"
            stroke={`url(#beam-${rid})`}
            strokeLinecap="round"
            strokeWidth="3.2"
          />
          <path
            className={styles.beamCore}
            d="M 168 98 Q 200 91 232 98"
            fill="none"
            stroke="oklch(92% 0.12 85 / 0.55)"
            strokeLinecap="round"
            strokeWidth="0.9"
          />

          <g transform="translate(124, 98)">
            <circle className={styles.glassHalo} r="52" />
            <circle
              className={styles.glassRim}
              fill="none"
              r="44"
              stroke="oklch(72% 0.1 200 / 0.45)"
              strokeWidth="0.9"
            />
            <g className={styles.fieldRing}>
              <ellipse
                cx="0"
                cy="0"
                fill="none"
                rx="32"
                ry="40"
                stroke="oklch(78% 0.16 55 / 0.45)"
                strokeDasharray="3 7"
                strokeWidth="0.65"
                transform="rotate(8)"
              />
              <ellipse
                cx="0"
                cy="0"
                fill="none"
                rx="24"
                ry="34"
                stroke="oklch(70% 0.18 48 / 0.35)"
                strokeDasharray="2 5"
                strokeWidth="0.5"
                transform="rotate(-22)"
              />
            </g>
            <circle
              className={styles.particleCore}
              fill={`url(#core-${rid})`}
              filter={`url(#coreGlow-${rid})`}
              r="12"
            />
          </g>

          <g transform="translate(276, 98)">
            <circle className={styles.glassHalo} r="52" />
            <circle
              className={styles.glassRim}
              fill="none"
              r="44"
              stroke="oklch(72% 0.1 200 / 0.45)"
              strokeWidth="0.9"
            />
            <g className={styles.fieldRingAlt}>
              <ellipse
                cx="0"
                cy="0"
                fill="none"
                rx="32"
                ry="40"
                stroke="oklch(78% 0.16 55 / 0.45)"
                strokeDasharray="3 7"
                strokeWidth="0.65"
                transform="rotate(-6)"
              />
              <ellipse
                cx="0"
                cy="0"
                fill="none"
                rx="24"
                ry="34"
                stroke="oklch(70% 0.18 48 / 0.35)"
                strokeDasharray="2 5"
                strokeWidth="0.5"
                transform="rotate(18)"
              />
            </g>
            <circle
              className={styles.particleCore}
              fill={`url(#core-${rid})`}
              filter={`url(#coreGlow-${rid})`}
              r="12"
            />
          </g>

          <g className={styles.sparkles} opacity={0.7}>
            <circle cx="68" cy="56" fill="oklch(90% 0.04 275 / 0.5)" r="1.1" />
            <circle cx="332" cy="48" fill="oklch(78% 0.1 200 / 0.45)" r="0.9" />
            <circle
              cx="200"
              cy="42"
              fill="oklch(93% 0.03 275 / 0.35)"
              r="0.7"
            />
            <circle
              cx="40"
              cy="130"
              fill="oklch(72% 0.15 310 / 0.35)"
              r="0.8"
            />
            <circle
              cx="360"
              cy="140"
              fill="oklch(90% 0.04 275 / 0.4)"
              r="0.85"
            />
          </g>

          <rect
            className={styles.sceneVignette}
            fill={`url(#vig-${rid})`}
            height={VB.h}
            width={VB.w}
            x="0"
            y="0"
          />
        </svg>
      </div>
    </div>
  );
};

/**
 * Home hero: procedural entangled cores and warped grid (space-gothic).
 */
export const HomeHeroVariants: React.FC = () => {
  return (
    <header className={styles.slot} aria-label="Welcome">
      <EntanglementHeroGraphic />
      <div className={styles.copy}>
        <p className={styles.eyebrow}>Portfolio</p>
        <h1 className={styles.name}>Kyle Gough</h1>
        <p className={styles.tag}>
          Front-end engineering and the craft of the UI
        </p>
        <p className={styles.intro}>{INTRO}</p>
        <div className={styles.cta}>
          <Link className={styles.ctaButton} to="#featured-work">
            See featured work
          </Link>
          <p className={styles.hint}>or open the project index in the nav</p>
        </div>
        <a className={styles.scroller} href="#featured-work">
          <span className={styles.scrollerLabel}>Scroll</span>
          <span className={styles.scrollerLine} aria-hidden />
        </a>
      </div>
    </header>
  );
};
