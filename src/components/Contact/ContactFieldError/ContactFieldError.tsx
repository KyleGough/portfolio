import { clsx } from 'clsx';
import React from 'react';

interface ContactFieldErrorProps {
  show: boolean;
  message: string;
}

export const ContactFieldError: React.FC<ContactFieldErrorProps> = ({
  show,
  message,
}) => (
  <span
    className={clsx(
      { hidden: !show },
      'transition-opactity',
      'duration-200',
      'text-sm',
      'text-error'
    )}
  >
    {message}
  </span>
);
