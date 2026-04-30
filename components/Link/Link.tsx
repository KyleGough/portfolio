import NextLink from "next/link";
import React from "react";

interface LinkProps {
  "aria-current"?: React.AriaAttributes["aria-current"];
  ariaLabel?: string;
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  to?: string;
}

export const Link: React.FC<LinkProps> = ({
  "aria-current": ariaCurrent,
  className = "text-link hover:text-link-hover focus:text-link-hover",
  to,
  href,
  onClick,
  ariaLabel,
  children,
}) => {
  return (
    <>
      {to ? (
        <NextLink
          aria-current={ariaCurrent}
          aria-label={ariaLabel}
          className={className}
          href={to}
          onClick={onClick}
        >
          {children}
        </NextLink>
      ) : (
        <a
          aria-current={ariaCurrent}
          className={className}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClick}
          aria-label={ariaLabel}
        >
          {children}
        </a>
      )}
    </>
  );
};
