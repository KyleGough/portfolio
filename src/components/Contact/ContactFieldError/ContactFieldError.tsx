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
    className={`${
      show ? '' : 'hidden'
    } transition-opactity duration-200 text-sm text-error`}
  >
    {message}
  </span>
);
