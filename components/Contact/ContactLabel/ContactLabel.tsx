import { clsx } from 'clsx';
import React from 'react';

interface ContactLabelProps {
  valid: boolean;
  htmlFor: string;
  children: React.ReactNode;
}

export const ContactLabel: React.FC<ContactLabelProps> = ({
  valid,
  htmlFor,
  children,
}) => (
  <label
    className={clsx(
      { 'text-link': valid },
      { 'text-error': !valid },
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
