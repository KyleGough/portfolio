import Image from 'next/image';
import React from 'react';

interface LabelledLogoProps {
  name: string;
  logo: string;
}

export const LabelledLogo: React.FC<LabelledLogoProps> = ({ name, logo }) => (
  <div className="text-center mb-8">
    <div className="w-8 h-8 mb-2 mx-auto">
      <Image src={logo} alt={`${name} Logo`} width={30} height={30} />
    </div>
    <p className="text-sm">{name}</p>
  </div>
);
