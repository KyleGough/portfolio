import { useEffect, useState } from 'react';

/**
 * Tracks `(prefers-reduced-motion: reduce)`. Defaults to `false` on the server
 * and on the first client paint so SSR markup matches the animated path; the
 * effect then syncs to the real preference (and final static styles apply when
 * reduced motion is requested).
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = (): void => {
      setReduced(mq.matches);
    };
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  return reduced;
}
