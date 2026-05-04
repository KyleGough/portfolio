import { createContext, useContext } from 'react';

/**
 * When false, hero WebGL pauses (tab hidden or hero stage off-screen).
 * Default true for any consumer rendered outside the provider.
 */
export const HeroAnimationActiveContext = createContext(true);

export function useHeroAnimationActive(): boolean {
  return useContext(HeroAnimationActiveContext);
}
