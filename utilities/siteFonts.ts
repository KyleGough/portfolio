import {
  IBM_Plex_Mono,
  Lato,
  Merriweather,
  Space_Grotesk,
} from 'next/font/google';

/**
 * Base body / heading fonts (Tailwind `font-primary`, `font-header`). Variables on
 * `<Html>` in `_document.tsx` so `body` and Tailwind can use `var(--font-lato)` etc.
 */
export const fontLato = Lato({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-lato',
  weight: ['400', '700'],
});

export const fontMerriweather = Merriweather({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-merriweather',
  weight: ['400', '700'],
});

/**
 * Space-gothic theme fonts. Variables are applied on `Layout`.
 */
export const fontSpaceGrotesk = Space_Grotesk({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['400', '500', '600', '700'],
});

export const fontIbmPlexMono = IBM_Plex_Mono({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
  weight: ['400', '500'],
});
