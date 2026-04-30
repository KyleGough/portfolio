import { GitHubIcon, MenuIcon } from "@components/Icons";
import { Link } from "@components/Link";
import Logo from "@image/logo.png";
import { isNavPathActive } from "@utilities/isNavPathActive";
import { clsx } from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

/** useLayoutEffect warns on SSR; on the server, use `useEffect` (effects still run only in the browser). */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const SCROLL_ELEVATE_PX = 8;
/** 0–1: ramp over first ~220px of scroll (drives overdrive layer intensity). */
const SCROLL_RAMP_PX = 220;

const BAR_LINK_BASE =
  "nav-link--bar border-bottom-slide mt-0 inline-block px-5 py-5";
const DRAWER_LINK_BASE =
  "nav-drawer__link text-inherit hover:text-link-hover focus:text-link-hover py-4 px-8 shadow-sm";
const FOCUS_CHROME_RINGS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link/40";
const ARIA_CURRENT_PAGE = (active: boolean) => (active ? "page" : undefined);

const BAR_LINKS = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
] as const;

export const Nav: React.FC = () => {
  const router = useRouter();
  const { asPath } = router;
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
      shellRef.current?.style.setProperty("--nav-scroll", t.toFixed(4));
    };
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => {
      window.removeEventListener("scroll", sync);
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
    document.addEventListener("click", checkClickOutside);
    // Remove listener on unmount.
    return () => {
      document.removeEventListener("click", checkClickOutside);
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
          "nav-bar--shell nav-bar--overdrive bg-nav-light relative z-[200] text-white",
          navScrolled && "nav-bar--scrolled",
        )}
        data-nav-elevated={navScrolled ? "true" : undefined}
      >
        <div className="nav-bar--inner relative z-10 flex w-full flex-wrap items-center justify-between px-2">
          <Link
            to="/"
            ariaLabel="Home"
            className="group mx-5 flex flex-shrink-0 items-center rounded-sm text-inherit no-underline
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
            focus-visible:outline-link/50"
            aria-current={isNavPathActive(asPath, "/") ? "page" : undefined}
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
            <span
              className={clsx(
                "nav-wordmark text-white transition-colors duration-200",
                isNavPathActive(asPath, "/") && "nav-wordmark--active",
                /* Keep wordmark white on logo row hover/focus (do not follow link accent) */
                "group-hover:text-white group-focus-visible:text-white",
              )}
            >
              Kyle Gough
            </span>
          </Link>
          <button
            type="button"
            ref={menuBtnRef}
            onClick={toggleDrawer}
            className={clsx(
              "nav-gh border-bottom-slide text-white block transition-colors duration-200",
              "hover:text-link focus-visible:text-link",
              FOCUS_CHROME_RINGS,
              "md:hidden px-6 py-5",
            )}
            aria-label="Toggle navigation"
          >
            <MenuIcon className="h-6 w-6 fill-current" />
          </button>
          <div className="hidden w-auto flex-grow md:block">
            <div className="text-right text-base">
              {BAR_LINKS.map(({ to, label }) => {
                const active = isNavPathActive(asPath, to);
                return (
                  <Link
                    key={to}
                    className={clsx(
                      BAR_LINK_BASE,
                      active && "nav-link--bar--active",
                    )}
                    to={to}
                    aria-current={ARIA_CURRENT_PAGE(active)}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>
          <Link
            className={clsx(
              "nav-gh border-bottom-slide items-center justify-center text-white",
              "hidden transition-colors duration-200 hover:text-link",
              FOCUS_CHROME_RINGS,
              "focus-visible:text-link md:inline-flex md:px-6 py-5",
            )}
            href="https://github.com/KyleGough"
            ariaLabel="GitHub Profile"
          >
            <GitHubIcon className="h-6 w-6 fill-current" />
          </Link>
        </div>
      </div>
      <div
        ref={mobileNavRef}
        className={clsx(
          { absolute: drawerOpen },
          { hidden: !drawerOpen },
          "slide-in z-[100] drop-shadow",
          "w-full md:hidden flex-grow",
        )}
      >
        <div className="text-link bg-background text-base">
          {BAR_LINKS.map(({ to, label }) => {
            const active = isNavPathActive(asPath, to);
            return (
              <Link
                key={to}
                className={clsx(
                  DRAWER_LINK_BASE,
                  active && "nav-drawer__link--active",
                )}
                to={to}
                onClick={closeDrawer}
                aria-current={ARIA_CURRENT_PAGE(active)}
              >
                {label}
              </Link>
            );
          })}
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
