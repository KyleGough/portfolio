import { clsx } from 'clsx';
import Image, { StaticImageData } from 'next/image';
import React from 'react';

interface CarouselImageProps {
  bg: StaticImageData;
  priority: boolean;
  show: boolean;
}

export const CarouselImage: React.FC<CarouselImageProps> = ({
  show,
  bg,
  priority,
}) => (
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
      priority={priority}
    />
  </div>
);
