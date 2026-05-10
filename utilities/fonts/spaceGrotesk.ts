import { Space_Grotesk } from 'next/font/google';

const fontSpaceGrotesk = Space_Grotesk({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['400', '500', '600', '700'],
});

export { fontSpaceGrotesk };
