import { useEffect, useRef, useState } from 'react';

/**
 * Wall-clock seconds since mount, driven by rAF while `animationActive`. Pauses when false.
 * Aligns with WebGL mission clock when both mount together; stays frozen while inactive.
 */
export function useHeroTelemetryWallSeconds(animationActive: boolean): number {
  const [t, setT] = useState(0);
  const time0Ref = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }
    if (time0Ref.current === null) {
      time0Ref.current = performance.now();
    }
    return undefined;
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }
    if (!animationActive) {
      return undefined;
    }
    if (time0Ref.current === null) {
      time0Ref.current = performance.now();
    }

    let rafId = 0;
    const tick = (): void => {
      setT((performance.now() - time0Ref.current!) / 1000);
      rafId = window.requestAnimationFrame(tick);
    };
    setT((performance.now() - time0Ref.current) / 1000);
    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [animationActive]);

  return t;
}
