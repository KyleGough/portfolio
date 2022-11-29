import { Section } from '@components/Section';
import { StaticImageData } from 'next/image';
import React from 'react';

interface ImageFigureProps {
  image: {
    imageData: StaticImageData;
    alt: string;
  };
}

export const ImageFigure: React.FC<ImageFigureProps> = ({ image }) => (
  <Section>
    <img
      className="border-2 border-white rounded-lg text-center items-center shadow mx-auto"
      src={image.imageData.src}
      alt={image.alt}
    />
    <p className="mt-4 mb-2 text-sm text-center text-light font-thin">
      {image.alt}
    </p>
  </Section>
);
