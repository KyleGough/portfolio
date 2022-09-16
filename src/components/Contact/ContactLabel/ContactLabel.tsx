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
    className={`${
      valid ? 'text-link' : 'text-error'
    } transition-colours duration-200 text-lg mt-8 mb-2 mr-2`}
    htmlFor={htmlFor}
  >
    {children}
  </label>
);
