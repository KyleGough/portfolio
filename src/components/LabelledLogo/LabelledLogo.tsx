import React from 'react';

interface LabelledLogoProps {
  name: string;
  logo: string;
}

export const LabelledLogo: React.FC<LabelledLogoProps> = ({ name, logo }) => (
  <div className="text-center mb-8">
    <img
      loading="lazy"
      className="w-8 h-8 mb-2 mx-auto"
      src={logo}
      alt={`${name} Logo`}
    />
    <p className="text-sm">{name}</p>
  </div>
);
