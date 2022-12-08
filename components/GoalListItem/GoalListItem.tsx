import { clsx } from 'clsx';
import Image, { StaticImageData } from 'next/image';
import React from 'react';

interface GoalListItemProps {
  logo?: StaticImageData;
  name: string;
}

export const GoalListItem: React.FC<GoalListItemProps> = ({ logo, name }) => (
  <li
    className={clsx(
      {
        'before:bg-link before:absolute before:h-2 before:w-2 before:rounded-full before:-left-9 ml-12':
          !logo,
      },
      'py-2 w-fit flex items-center relative'
    )}
  >
    {logo && (
      <Image
        src={logo.src}
        className="w-8 h-8 mr-4"
        width={30}
        height={30}
        alt={`${name} Logo`}
      />
    )}
    {name}
  </li>
);
