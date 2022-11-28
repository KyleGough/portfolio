import NextLink from 'next/link';
import React from 'react';

interface LinkProps {
  to?: string;
  href?: string;
  children: React.ReactNode;
}

export const Link: React.FC<LinkProps> = ({ to, href, children }) => {
  return (
    <>
      {to ? (
        <NextLink
          className="text-link hover:text-link-hover focus:text-link-hover"
          href={to}
        >
          {children}
        </NextLink>
      ) : (
        <a
          className="text-link hover:text-link-hover focus:text-link-hover"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      )}
    </>
  );
};
