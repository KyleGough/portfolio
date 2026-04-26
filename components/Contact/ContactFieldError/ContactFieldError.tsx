import { clsx } from 'clsx';
import React from 'react';

interface ContactFieldErrorProps {
  message: string;
}

export const ContactFieldError: React.FC<ContactFieldErrorProps> = ({
  message,
}) => (
  <span
    className={clsx(
      'block font-primary text-sm font-medium leading-snug text-error',
      'transition-opacity duration-200',
      'mb-1'
    )}
  >
    {message}
  </span>
);
