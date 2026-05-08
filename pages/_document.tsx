import { fontLato, fontMerriweather } from '@utilities/siteFonts';
import { clsx } from 'clsx';
import { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

export default function Document() {
  return (
    <Html
      lang="en"
      className={clsx(fontLato.variable, fontMerriweather.variable)}
    >
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
