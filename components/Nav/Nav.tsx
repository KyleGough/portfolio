import { GitHubIcon, MenuIcon } from '@components/Icons';
import { Link } from '@components/Link';
import Logo from '@image/logo.png';
import { clsx } from 'clsx';
import Image from 'next/image';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

/** useLayoutEffect warns on SSR; on the server, use `useEffect` (effects still run only in the browser). */
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const SCROLL_ELEVATE_PX = 8;
/** 0–1: ramp over first ~220px of scroll (drives overdrive layer intensity). */
const SCROLL_RAMP_PX = 220;

export const Nav: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);

  const toggleDrawer = () => setDrawerOpen((prev) => !prev);
  const closeDrawer = () => setDrawerOpen(false);

  useIsomorphicLayoutEffect(() => {
    const sync = () => {
      const y = window.scrollY;
      setNavScrolled(y > SCROLL_ELEVATE_PX);
      const t = Math.min(1, Math.max(0, y / SCROLL_RAMP_PX));
      shellRef.current?.style.setProperty('--nav-scroll', t.toFixed(4));
    };
    sync();
    window.addEventListener('scroll', sync, { passive: true });
    return () => {
      window.removeEventListener('scroll', sync);
    };
  }, []);

  useEffect(() => {
    // Close mobile nav drawer if user clicks outside nav component.
    const checkClickOutside = (event: MouseEvent) => {
      if (
        menuBtnRef.current &&
        !menuBtnRef.current.contains(event.target as Node) &&
        mobileNavRef.current &&
        !mobileNavRef.current.contains(event.target as Node)
      ) {
        closeDrawer();
      }
    };
    // Add listener on mount.
    document.addEventListener('click', checkClickOutside);
    // Remove listener on unmount.
    return () => {
      document.removeEventListener('click', checkClickOutside);
    };
  }, []);

  return (
    <nav
      className="font-primary absolute z-50 w-full antialiased"
      role="navigation"
      aria-label="Main"
    >
      <div
        ref={shellRef}
        className={clsx(
          'nav-bar--shell nav-bar--overdrive bg-nav-light relative z-[200] text-white',
          navScrolled && 'nav-bar--scrolled'
        )}
        data-nav-elevated={navScrolled ? 'true' : undefined}
      >
        <div className="nav-bar--inner relative z-10 flex w-full flex-wrap items-center justify-between px-2">
        <Link
          to="/"
          ariaLabel="Home"
          className="mx-5 flex flex-shrink-0 items-center text-inherit no-underline"
        >
          <div className="mr-4 h-8 w-8">
            <Image
              src={Logo.src}
              alt="Website Logo"
              width={Logo.width}
              height={Logo.height}
              placeholder="blur"
              blurDataURL={Logo.blurDataURL}
              priority
            />
          </div>
          <span className="nav-wordmark">Kyle Gough</span>
        </Link>
        <button
          type="button"
          ref={menuBtnRef}
          onClick={toggleDrawer}
          className="nav-gh border-bottom-slide block md:hidden px-6 py-5"
          aria-label="Toggle navigation"
        >
          <MenuIcon className="h-6 w-6 fill-white" />
        </button>
        <div className="hidden w-auto flex-grow md:block">
          <div className="text-right text-base">
            <Link
              className="nav-link--bar border-bottom-slide mt-0 inline-block px-5 py-5"
              to="/"
            >
              Home
            </Link>
            <Link
              className="nav-link--bar border-bottom-slide mt-0 inline-block px-5 py-5"
              to="/projects"
            >
              Projects
            </Link>
            <Link
              className="nav-link--bar border-bottom-slide mt-0 inline-block px-5 py-5"
              to="/about"
            >
              About Me
            </Link>
          </div>
        </div>
        <Link
          className="nav-gh border-bottom-slide hidden px-6 py-5 md:block"
          href="https://github.com/KyleGough"
          ariaLabel="GitHub Profile"
        >
          <GitHubIcon className="h-6 w-6 fill-white" />
        </Link>
        </div>
      </div>
      <div
        ref={mobileNavRef}
        className={clsx(
          { absolute: drawerOpen },
          { hidden: !drawerOpen },
          'slide-in z-[100] drop-shadow',
          'w-full md:hidden flex-grow'
        )}
      >
        <div className="text-link bg-background text-base">
          <Link
            className="nav-drawer__link text-inherit hover:text-link-hover focus:text-link-hover py-4 px-8 shadow-sm"
            to="/"
            onClick={closeDrawer}
          >
            Home
          </Link>
          <Link
            className="nav-drawer__link text-inherit hover:text-link-hover focus:text-link-hover py-4 px-8 shadow-sm"
            to="/projects"
            onClick={closeDrawer}
          >
            Projects
          </Link>
          <Link
            className="nav-drawer__link text-inherit hover:text-link-hover focus:text-link-hover py-4 px-8 shadow-sm"
            to="/about"
            onClick={closeDrawer}
          >
            About Me
          </Link>
          <Link
            className="nav-drawer__link group flex items-center text-inherit hover:text-link-hover focus:text-link-hover py-4 px-8 shadow-sm"
            onClick={closeDrawer}
            href="https://github.com/KyleGough"
          >
            <GitHubIcon className="mr-2 h-6 w-6 fill-link group-hover:fill-link-hover group-focus:fill-link-hover" />
            GitHub
          </Link>
        </div>
      </div>
    </nav>
  );
};
