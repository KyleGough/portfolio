import { GitHubIcon, MenuIcon } from '@components/Icons';
import { Link } from '@components/Link';
import { clsx } from 'clsx';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

export const Nav: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);

  const toggleDrawer = () => setDrawerOpen((prev) => !prev);
  const closeDrawer = () => setDrawerOpen(false);

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
    <nav className="leading-6 w-full absolute z-50">
      <div className="flex relative z-[200] items-center justify-between flex-wrap bg-nav text-white px-2">
        <div className="flex items-center flex-shrink-0 mr-6">
          <Link to="/" ariaLabel="Home" className="mx-5 w-8 h-8">
            <Image
              src="/favicon-32x32.png"
              alt="Website Logo"
              width={30}
              height={30}
            />
          </Link>
          <p className="text-xl tracking-normal">Kyle Gough</p>
        </div>
        <button
          ref={menuBtnRef}
          onClick={toggleDrawer}
          className="border-bottom-slide block md:hidden px-6 py-5"
          aria-label="Toggle Navigation"
        >
          <MenuIcon className="w-6 h-6 fill-white" />
        </button>
        <div className="hidden md:block flex-grow w-auto">
          <div className="flex-grow text-right">
            <Link
              className="border-bottom-slide inline-block px-5 py-5 mt-0"
              to="/"
            >
              Home
            </Link>
            <Link
              className="border-bottom-slide inline-block px-5 py-5 mt-0"
              to="/projects"
            >
              Projects
            </Link>
            <Link
              className="border-bottom-slide inline-block px-5 py-5 mt-0"
              to="/about"
            >
              About Me
            </Link>
          </div>
        </div>
        <Link
          className="border-bottom-slide hidden md:block px-6 py-5"
          href="https://github.com/KyleGough"
          ariaLabel="GitHub Profile"
        >
          <GitHubIcon className="w-6 h-6 fill-white" />
        </Link>
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
        <div className="text-link leading-8 bg-background">
          <Link
            className="block hover:text-link-hover focus:text-link-hover py-4 px-8 shadow-sm"
            to="/"
            onClick={closeDrawer}
          >
            Home
          </Link>
          <Link
            className="block hover:text-link-hover focus:text-link-hover py-4 px-8 shadow-sm"
            to="/projects"
            onClick={closeDrawer}
          >
            Projects
          </Link>
          <Link
            className="block hover:text-link-hover focus:text-link-hover py-4 px-8 shadow-sm"
            to="/about"
            onClick={closeDrawer}
          >
            About Me
          </Link>
          <Link
            className="group flex items-center hover:text-link-hover focus:text-link-hover py-4 px-8 shadow-sm"
            onClick={closeDrawer}
            href="https://github.com/KyleGough"
          >
            <GitHubIcon className="w-6 h-6 mr-2 fill-link group-hover:fill-link-hover group-focus:fill-link-hover" />
            GitHub
          </Link>
        </div>
      </div>
    </nav>
  );
};
