import React from 'react';

interface EmailTemplateProps {
  email: string;
  message: string;
  name: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  email,
  name,
  message,
}) => (
  <div>
    <h1>
      Portfolio message from {name} ({email})
    </h1>
    <p>{message}</p>
  </div>
);
