import { ImageModal } from '@components/ImageModal';
import { Section } from '@components/Section';
import { StaticImageData } from 'next/image';
import React from 'react';

interface ScreenshotProps {
  images: {
    imageData: StaticImageData;
    alt: string;
  }[];
}

export const Screenshots: React.FC<ScreenshotProps> = ({ images }) => (
  <Section>
    <h2 className="text-3xl mb-12">Screenshots</h2>
    <div className="grid grid-cols-12 gap-4">
      {images.map((image, i) => {
        return <ImageModal key={i} src={image.imageData.src} alt={image.alt} />;
      })}
    </div>
  </Section>
);
