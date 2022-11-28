import React, { useEffect, useRef, useState } from 'react';

import { CarouselImage } from './CarouselImage';

interface CarouselProps {
  children: React.ReactNode;
  backgrounds: string[];
}

export const Carousel: React.FC<CarouselProps> = ({
  children,
  backgrounds,
}) => {
  const [carousel, setCarousel] = useState(0);
  const carouselCount = backgrounds.length;
  const carouselInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    carouselInterval.current = setInterval(carouselNext, 10_000);
    return () => {
      window.clearInterval(carouselInterval.current as NodeJS.Timeout);
    };
  });

  const carouselNext = () =>
    setCarousel((carousel) => (carousel + 1) % carouselCount);

  return (
    <div className="flex justify-center items-center h-screen relative">
      <div className="absolute inset-0 bg-black opacity-70 w-full h-full z-10"></div>
      {backgrounds.map((image, index) => (
        <CarouselImage
          key={`${image}_${index}`}
          bg={image}
          show={carousel === index}
        />
      ))}
      <div className="z-20 absolute inset-0 text-white mx-auto text-center flex tracking-tight items-center">
        {children}
      </div>
    </div>
  );
};
