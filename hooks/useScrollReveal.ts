import { RefObject, useEffect, useRef, useState } from 'react';

interface ScrollRevealOptions {
  /** Minimum intersection ratio required to reveal (0–1). */
  ratio?: number;
  /**
   * Shrinks the observer root from the bottom so elements peeking at the
   * fold do not count as revealed until they enter further into view.
   */
  bottomExclusion?: string;
}

const exclusionRatioFromCss = (bottomExclusion: string): number => {
  const parsed = parseFloat(bottomExclusion);
  return Number.isFinite(parsed) ? parsed / 100 : 0.18;
};

const overlapsRevealZone = (
  el: HTMLElement,
  ratio: number,
  bottomExclusion: string,
): boolean => {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || 0;
  const exclusionPx = vh * exclusionRatioFromCss(bottomExclusion);
  const visibleBottom = vh - exclusionPx;
  const height = Math.max(rect.height, 1);
  const overlap = Math.min(rect.bottom, visibleBottom) - Math.max(rect.top, 0);
  return overlap / height >= ratio;
};

/**
 * One-shot scroll reveal. Becomes true the first time the element intersects
 * the viewport with enough ratio, after layout has settled. Ignores the
 * bottom slice of the viewport so fold-peek does not fire early.
 */
export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {},
): [RefObject<T | null>, boolean] {
  const { ratio = 0.4, bottomExclusion = '18%' } = options;
  const elementRef = useRef<T>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (revealed) return undefined;

    const el = elementRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      return undefined;
    }

    let armed = false;
    let armFrameOuter = 0;
    let armFrameInner = 0;
    let armTimer = 0;

    const revealIfReady = (entry: IntersectionObserverEntry): void => {
      if (!armed) return;
      if (entry.isIntersecting && entry.intersectionRatio >= ratio) {
        setRevealed(true);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) revealIfReady(entry);
      },
      {
        threshold: [0, ratio, Math.min(1, ratio + 0.15)],
        rootMargin: `0px 0px -${bottomExclusion} 0px`,
      },
    );

    observer.observe(el);

    const arm = (): void => {
      armed = true;
      if (overlapsRevealZone(el, ratio, bottomExclusion)) {
        setRevealed(true);
      }
    };

    // Wait two frames + a short delay so hero layout / fonts / WebGL stage
    // settle before we honor intersections (avoids false positives on load).
    armFrameOuter = window.requestAnimationFrame(() => {
      armFrameInner = window.requestAnimationFrame(() => {
        armTimer = window.setTimeout(arm, 120);
      });
    });

    return () => {
      window.cancelAnimationFrame(armFrameOuter);
      window.cancelAnimationFrame(armFrameInner);
      window.clearTimeout(armTimer);
      observer.disconnect();
    };
  }, [revealed, ratio, bottomExclusion]);

  return [elementRef, revealed];
}
