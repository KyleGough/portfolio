import { clsx } from 'clsx';
import Image, { StaticImageData } from 'next/image';
import React from 'react';

interface CarouselImageProps {
  show: boolean;
  bg: StaticImageData;
}

export const CarouselImage: React.FC<CarouselImageProps> = ({ show, bg }) => (
  <div
    className={clsx(
      { 'opacity-100': show },
      { 'opacity-0': !show },
      'absolute top-0 left-0',
      'w-full h-full clip-inset',
      'duration-2000 transition-opacity'
    )}
  >
    <Image
      src={bg.src}
      alt=""
      width={bg.width}
      height={bg.height}
      placeholder="blur"
      blurDataURL={bg.blurDataURL}
      className="fixed object-cover object-center w-full h-full"
    />
  </div>
);
