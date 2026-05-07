'use client';

import React, { useEffect } from 'react';

const SG_SCROLL_Y_PROP = '--sg-scroll-y';
const SG_STAR_DRIFT_Y_PROP = '--sg-star-drift-y';
const SG_STAR_DRIFT_LOOP_Y_PROP = '--sg-star-drift-loop-y';
const STAR_DRIFT_PX_PER_MS = 0.0054;
const STARFIELD_HEIGHT_MULTIPLIER = 1.4;

/**
 * Drives scroll + time vars on `:root` so grid/stars can parallax with scroll and
 * stars can drift upward slowly over time. Disabled when `prefers-reduced-motion`.
 */
export const SpaceGothicScrollVars: React.FC = () => {
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const root = document.documentElement;

    if (mq.matches) {
      root.style.setProperty(SG_SCROLL_Y_PROP, '0px');
      root.style.setProperty(SG_STAR_DRIFT_Y_PROP, '0px');
      root.style.setProperty(SG_STAR_DRIFT_LOOP_Y_PROP, '0px');
      return undefined;
    }

    let animationFrame = 0;
    let driftLoopPx = Math.max(
      window.innerHeight * STARFIELD_HEIGHT_MULTIPLIER,
      1,
    );
    const sync = (): void => {
      root.style.setProperty(SG_SCROLL_Y_PROP, `${window.scrollY}px`);
    };
    const syncDriftLoop = (): void => {
      driftLoopPx = Math.max(
        window.innerHeight * STARFIELD_HEIGHT_MULTIPLIER,
        1,
      );
      root.style.setProperty(
        SG_STAR_DRIFT_LOOP_Y_PROP,
        `${driftLoopPx.toFixed(2)}px`,
      );
    };
    const tick = (timeMs: number): void => {
      const driftPx = (timeMs * STAR_DRIFT_PX_PER_MS) % driftLoopPx;
      root.style.setProperty(
        SG_STAR_DRIFT_Y_PROP,
        `${driftPx.toFixed(2)}px`,
      );
      animationFrame = window.requestAnimationFrame(tick);
    };

    syncDriftLoop();
    sync();
    window.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', syncDriftLoop, { passive: true });
    animationFrame = window.requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('scroll', sync);
      window.removeEventListener('resize', syncDriftLoop);
      window.cancelAnimationFrame(animationFrame);
      root.style.removeProperty(SG_SCROLL_Y_PROP);
      root.style.removeProperty(SG_STAR_DRIFT_Y_PROP);
      root.style.removeProperty(SG_STAR_DRIFT_LOOP_Y_PROP);
    };
  }, []);

  return null;
};
