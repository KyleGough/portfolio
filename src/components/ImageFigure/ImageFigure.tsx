import React from 'react';
import { Section } from '../Section';

interface Image {
  src: string;
  caption: string;
}

interface ImageFigureProps {
  image: Image;
}

export const ImageFigure: React.FC<ImageFigureProps> = ({ image }) => (
  <Section>
    <img
      className="border-2 border-white rounded-lg text-center items-center shadow mx-auto"
      src={image.src}
      alt={image.caption}
    />
    <p className="mt-4 mb-2 text-sm text-center text-light font-thin">
      {image.caption}
    </p>
  </Section>
);
