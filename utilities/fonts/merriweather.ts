import { Merriweather } from 'next/font/google';

const fontMerriweather = Merriweather({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-merriweather',
  weight: ['400', '700'],
});

export { fontMerriweather };
