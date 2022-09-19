import React, { MouseEventHandler } from 'react';

interface ScrollButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}

export const ScrollButton: React.FC<ScrollButtonProps> = ({
  onClick,
  children,
}) => (
  <button
    onClick={onClick}
    className="shimmer max-w-[22rem] md:h-[78px] mx-auto w-full px-12 py-4 bg-background text-link hover:text-link-hover focus:text-link-hover rounded-sm shadow border-light"
  >
    {children}
  </button>
);
