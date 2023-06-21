import { FadeIn } from '@components/FadeIn';
import { clsx } from 'clsx';
import Image from 'next/image';
import React from 'react';

interface SkillItemProps {
  className?: string;
  description: string;
  logo: string;
  name: string;
}

export const SkillItem: React.FC<SkillItemProps> = ({
  name,
  description,
  logo,
  className,
}) => (
  <li
    className={clsx(
      'flex py-6 ml-8 items-center relative before:absolute before:h-2 before:w-2 before:rounded-full before:-left-6',
      className
    )}
  >
    <FadeIn className="mr-4 w-8 h-8 duration-500 relative">
      <Image src={logo} alt={`${name} logo`} width={30} height={30} />
    </FadeIn>
    <div>
      <p>
        <span className="font-extrabold text-lg">{name}</span> -{' '}
        <span className="text-sm">{description}</span>
      </p>
    </div>
  </li>
);
