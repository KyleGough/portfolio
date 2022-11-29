import NextLink from 'next/link';
import React from 'react';

interface LinkProps {
  className?: string;
  to?: string;
  href?: string;
  onClick?: () => void;
  ariaLabel?: string;
  children: React.ReactNode;
}

export const Link: React.FC<LinkProps> = ({
  className = 'text-link hover:text-link-hover focus:text-link-hover',
  to,
  href,
  onClick,
  ariaLabel,
  children,
}) => {
  return (
    <>
      {to ? (
        <NextLink className={className} href={to} onClick={onClick}>
          {children}
        </NextLink>
      ) : (
        <a
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
