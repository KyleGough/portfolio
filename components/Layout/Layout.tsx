import { Footer } from '@components/Footer';
import { Nav } from '@components/Nav';
import { clsx } from 'clsx';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { OpenGraphMeta } from './OpenGraphMeta';
import { socialMeta } from './SocialMeta';
import { TwitterMeta } from './TwitterMeta';

interface LayoutProps {
  children: React.ReactNode;
  /** Use space-gothic void chrome (same as /projects) without changing the URL. */
  theme?: 'default' | 'space-gothic';
  title?: string;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  theme = 'default',
  title = 'Kyle Gough - Portfolio',
}) => {
  const router = useRouter();
  const isSpaceGothic =
    theme === 'space-gothic' || router.pathname.startsWith('/projects');

  useEffect(() => {
    const el = document.querySelector('meta[name="theme-color"]');
    if (el) {
      el.setAttribute('content', isSpaceGothic ? '#07070c' : '#424242');
    }
  }, [isSpaceGothic]);

  return (
    <div
      className={clsx('App', isSpaceGothic && 'app-space-gothic')}
    >
      <Head>
        <meta charSet="utf-8" />
        <meta name="author" content="Kyle Gough" />
        <meta name="title" content={title} />
        <meta name="description" content={socialMeta.desc} />
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
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta
          name="theme-color"
          content={isSpaceGothic ? '#07070c' : '#424242'}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <OpenGraphMeta
          url={socialMeta.url}
          title={title}
          desc={socialMeta.desc}
          image={socialMeta.image}
        />
        <TwitterMeta
          url={socialMeta.url}
          title={title}
          desc={socialMeta.desc}
          image={socialMeta.image}
        />
        <meta
          name="google-site-verification"
          content="7jcIXXo7ktdDA3Fr3YVGoe5jCjt6j8Z0LbtPUEZdLqs"
        />
        <title>{title}</title>
      </Head>
      <Nav />
      <main
        className={clsx(
          'leading-[1.6rem] relative',
          isSpaceGothic
            ? 'text-primary'
            : 'bg-background bg-noise bg-repeat'
        )}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};
