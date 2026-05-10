import { IBM_Plex_Mono } from 'next/font/google';

const fontIbmPlexMono = IBM_Plex_Mono({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
  weight: ['400', '500'],
});

export { fontIbmPlexMono };
