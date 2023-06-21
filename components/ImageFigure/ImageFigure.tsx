import { Section } from '@components/Section';
import Image, { StaticImageData } from 'next/image';
import React from 'react';

interface ImageFigureProps {
  image: {
    alt: string;
    imageData: StaticImageData;
  };
}

export const ImageFigure: React.FC<ImageFigureProps> = ({ image }) => (
  <Section>
    <Image
      className="border-2 border-white rounded-lg text-center items-center shadow mx-auto"
      src={image.imageData.src}
      alt={image.alt}
      width={image.imageData.width}
      height={image.imageData.height}
      placeholder="blur"
      blurDataURL={image.imageData.blurDataURL}
    />
    <p className="mt-4 mb-2 text-sm text-center text-light font-thin">
      {image.alt}
    </p>
  </Section>
);
