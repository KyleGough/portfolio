"use client";

import React, { useEffect } from "react";

const SG_SCROLL_Y_PROP = "--sg-scroll-y";

/**
 * Drives `--sg-scroll-y` on `:root` so `.app-space-gothic main::before` (grid) can
 * parallax against normal document scroll. Disabled when `prefers-reduced-motion`.
 */
export const SpaceGothicScrollVars: React.FC = () => {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const root = document.documentElement;

    if (mq.matches) {
      root.style.setProperty(SG_SCROLL_Y_PROP, "0px");
      return undefined;
    }

    const sync = (): void => {
      root.style.setProperty(SG_SCROLL_Y_PROP, `${window.scrollY}px`);
    };

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => {
      window.removeEventListener("scroll", sync);
      root.style.removeProperty(SG_SCROLL_Y_PROP);
    };
  }, []);

  return null;
};
