import { Nav } from '@components//Nav';
import { Footer } from '@components/Footer';
import Head from 'next/head';
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  title = 'Kyle Gough - Portfolio',
}) => {
  return (
    <div className="App">
      <Head>
        <meta charSet="utf-8" />
        <meta name="author" content="Kyle Gough" />
        <meta
          name="description"
          content="Programmer and web developer. Portfolio showcasing my websites, applications, visualisers, and games."
        />
        <meta
          name="keywords"
          content="Kyle, Gough, Portfolio, Project, Programmer, Web, Developer, Python, Sorting, Visualiser"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link crossOrigin="true" rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Kyle Gough - Portfolio" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kylegough.co.uk/" />
        <meta
          property="og:image"
          content="https://kylegough.co.uk/favicon.ico"
        />
        <meta
          property="og:description"
          content="Programmer and web developer. Portfolio showcasing my websites, applications, visualisers, and games."
        />
        <meta
          name="google-site-verification"
          content="7jcIXXo7ktdDA3Fr3YVGoe5jCjt6j8Z0LbtPUEZdLqs"
        />
        <title>{title}</title>
      </Head>
      <Nav />
      <main className="bg-background bg-noise bg-repeat leading-[1.6rem]">
        {children}
      </main>
      <Footer />
    </div>
  );
};
