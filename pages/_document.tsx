import { fontLato, fontMerriweather } from '@utilities/siteFonts';
import { VIEWPORT_UNIT_POLYFILL_INLINE } from '@utilities/viewportUnitPolyfill';
import { clsx } from 'clsx';
import { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

export default function Document() {
  return (
    <Html
      lang="en"
      className={clsx(fontLato.variable, fontMerriweather.variable)}
    >
      <Head>
        {/* Runs before React hydrate; sets --vp-svh / --vp-lvh / --vp-dvh when svh is unsupported */}
        <script
          dangerouslySetInnerHTML={{ __html: VIEWPORT_UNIT_POLYFILL_INLINE }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
