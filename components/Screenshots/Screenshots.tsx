import { ImageModal } from '@components/ImageModal';
import { Section } from '@components/Section';
import { StaticImageData } from 'next/image';
import React from 'react';

interface ScreenshotProps {
  images: {
    alt: string;
    imageData: StaticImageData;
  }[];
}

export const Screenshots: React.FC<ScreenshotProps> = ({ images }) => (
  <Section>
    <h2 className="mb-12 text-3xl">Screenshots</h2>
    <div className="grid grid-cols-12 gap-4">
      {images.map((image, i) => {
        return <ImageModal key={i} image={image.imageData} alt={image.alt} />;
      })}
    </div>
  </Section>
);
