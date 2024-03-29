import { clsx } from 'clsx';
import React, { forwardRef } from 'react';

interface SectionProps {
  children?: React.ReactNode;
  id?: string;
  overrideTopPadding?: boolean;
}

const Section = forwardRef<HTMLDivElement, SectionProps>(
  ({ id, overrideTopPadding = false, children }, ref) => (
    <div
      id={id}
      ref={ref}
      className={clsx(
        { 'first:pt-24': !overrideTopPadding },
        'container text-primary py-8 last:pb-16'
      )}
    >
      {children}
    </div>
  )
);

Section.displayName = 'Section';
export { Section };
