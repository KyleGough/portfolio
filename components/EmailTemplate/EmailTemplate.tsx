import React from "react";

interface EmailTemplateProps {
  email: string;
  message: string;
  name: string;
}

export function EmailTemplate({
  email,
  name,
  message,
}: Readonly<EmailTemplateProps>) {
  return (
    <div>
      <h1>
        Portfolio message from {name} ({email})
      </h1>
      <p>{message}</p>
    </div>
  );
}
