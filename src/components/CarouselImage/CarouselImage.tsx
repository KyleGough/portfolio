import { clsx } from 'clsx';
import React from 'react';

interface CarouselImageProps {
  show: boolean;
  bg: string;
}

export const CarouselImage: React.FC<CarouselImageProps> = ({ show, bg }) => (
  <div
    className={clsx(
      bg,
      { 'opacity-100': show },
      { 'opacity-0': !show },
      'absolute top-0 left-0',
      'w-full h-full',
      'bg-fixed bg-center bg-cover',
      'duration-2000 transition-opacity'
    )}
  ></div>
);
