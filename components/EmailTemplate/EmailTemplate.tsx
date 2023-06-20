interface EmailTemplateProps {
  email: string;
  name: string;
  message: string;
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
