import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface LinkProps {
  to?: string;
  href?: string;
  children: React.ReactNode;
}

export const Link: React.FC<LinkProps> = ({ to, href, children }) => {
  return (
    <>
      {to ? (
        <RouterLink
          className="text-link hover:text-link-hover focus:text-link-hover"
          to={to}
        >
          {children}
        </RouterLink>
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
