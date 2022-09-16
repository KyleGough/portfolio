import React, { forwardRef } from 'react';

interface SectionProps {
  id?: string;
  overrideTopPadding?: boolean;
  children: React.ReactNode;
}

//TODO
// eslint-disable-next-line react/display-name
export const Section = forwardRef<HTMLDivElement, SectionProps>(
  ({ id, overrideTopPadding = false, children }, ref) => (
    <div
      id={id}
      ref={ref}
      className={`container text-primary py-8 last:pb-16 ${
        overrideTopPadding ? '' : 'first:pt-24'
      }`}
    >
      {children}
    </div>
  )
);
