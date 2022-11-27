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
      'transition-opactity',
      'duration-200',
      'text-sm',
      'text-error'
    )}
  >
    {message}
  </span>
);
