import Link from 'next/link';
import React from 'react';

interface FooterLinkProps {
  children: React.ReactNode;
  href: string;
}

export const FooterLink: React.FC<FooterLinkProps> = ({ children, href }) => {
  return (
    <li>
      <Link href={href} className="p-2 hover:text-nav-hover">
        {children}
      </Link>
    </li>
  );
};
