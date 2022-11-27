import { Section } from '@components/Section';
import React from 'react';

interface ImageFigureProps {
  image: {
    src: string;
    alt: string;
  };
}

export const ImageFigure: React.FC<ImageFigureProps> = ({ image }) => (
  <Section>
    <img
      className="border-2 border-white rounded-lg text-center items-center shadow mx-auto"
      src={image.src}
      alt={image.alt}
    />
    <p className="mt-4 mb-2 text-sm text-center text-light font-thin">
      {image.alt}
    </p>
  </Section>
);
