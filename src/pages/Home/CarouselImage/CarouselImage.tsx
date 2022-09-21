import React from 'react';

interface CarouselImageProps {
  show: boolean;
  bg: string;
}

export const CarouselImage: React.FC<CarouselImageProps> = ({ show, bg }) => (
  <div
    className={`${bg} ${
      show ? 'opacity-100' : 'opacity-0'
    } absolute top-0 left-0 w-full h-full bg-fixed bg-center bg-cover duration-2000 transition-opacity`}
  ></div>
);
