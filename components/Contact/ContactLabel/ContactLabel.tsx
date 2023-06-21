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
      'transition-colours',
      'duration-200',
      'text-lg',
      'mt-8',
      'mb-2',
      'mr-2'
    )}
    htmlFor={htmlFor}
  >
    {children}
  </label>
);
