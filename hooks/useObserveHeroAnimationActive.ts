import { RefObject, useEffect, useState } from 'react';

/**
 * True when the document tab is visible and `elementRef` intersects the viewport.
 */
export function useObserveHeroAnimationActive(
  elementRef: RefObject<Element | null>,
): boolean {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const el = elementRef.current;
    if (!el || typeof document === 'undefined') {
      return undefined;
    }

    let intersecting = true;

    const apply = (): void => {
      const tabOk = document.visibilityState === 'visible';
      setActive(tabOk && intersecting);
    };

    const onVisibility = (): void => {
      apply();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        intersecting = entries.some((entry) => entry.isIntersecting);
        apply();
      },
      { root: null, rootMargin: '0px', threshold: 0 },
    );

    observer.observe(el);
    document.addEventListener('visibilitychange', onVisibility);
    apply();

    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      observer.disconnect();
    };
  }, [elementRef]);

  return active;
}
