import { clsx } from 'clsx';
import React from 'react';

interface ContactLabelProps {
  children: React.ReactNode;
  htmlFor: string;
  isSent: boolean;
  valid: boolean;
}

export const ContactLabel: React.FC<ContactLabelProps> = ({
  valid,
  isSent,
  htmlFor,
  children,
}) => (
  <label
    className={clsx(
      { 'text-link-hover': isSent },
      { 'text-link group-focus-within:text-link-hover': valid && !isSent },
      { 'text-error': !valid && !isSent },
      'block font-primary text-lg font-medium leading-snug tracking-wide',
      'transition-colors duration-200',
      'mt-6 mb-1.5'
    )}
    htmlFor={htmlFor}
  >
    {children}
  </label>
);
