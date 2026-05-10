'use client';

import React, { useEffect } from 'react';

const SG_SCROLL_Y_PROP = '--sg-scroll-y';
const SG_STAR_DRIFT_LOOP_Y_PROP = '--sg-star-drift-loop-y';
const SG_STAR_DRIFT_DURATION_PROP = '--sg-star-drift-duration';
/** Matches former RAF drift: `STAR_DRIFT_PX_PER_MS` × 1000 px per wall second. */
const STAR_DRIFT_PX_PER_SEC = 5.4;
const STARFIELD_HEIGHT_MULTIPLIER = 1.4;

/**
 * Drives scroll vars on `:root` for grid/star parallax. Star **drift** uses CSS
 * `@keyframes` (see `Starfield.module.css`) so we avoid mutating `:root` every
 * frame — that pattern is disproportionately costly on iOS Safari and can
 * contribute to WebKit process termination + reload.
 */
export const SpaceGothicScrollVars: React.FC = () => {
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const root = document.documentElement;

    if (mq.matches) {
      root.style.setProperty(SG_SCROLL_Y_PROP, '0px');
      root.style.setProperty(SG_STAR_DRIFT_LOOP_Y_PROP, '0px');
      root.style.setProperty(SG_STAR_DRIFT_DURATION_PROP, '0s');
      return undefined;
    }

    const sync = (): void => {
      root.style.setProperty(SG_SCROLL_Y_PROP, `${window.scrollY}px`);
    };
    const syncDriftLoop = (): void => {
      const driftLoopPx = Math.max(
        window.innerHeight * STARFIELD_HEIGHT_MULTIPLIER,
        1,
      );
      root.style.setProperty(
        SG_STAR_DRIFT_LOOP_Y_PROP,
        `${driftLoopPx.toFixed(2)}px`,
      );
      const sec = driftLoopPx / STAR_DRIFT_PX_PER_SEC;
      root.style.setProperty(SG_STAR_DRIFT_DURATION_PROP, `${sec.toFixed(3)}s`);
    };

    syncDriftLoop();
    sync();
    window.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', syncDriftLoop, { passive: true });
    return () => {
      window.removeEventListener('scroll', sync);
      window.removeEventListener('resize', syncDriftLoop);
      root.style.removeProperty(SG_SCROLL_Y_PROP);
      root.style.removeProperty(SG_STAR_DRIFT_LOOP_Y_PROP);
      root.style.removeProperty(SG_STAR_DRIFT_DURATION_PROP);
    };
  }, []);

  return null;
};
