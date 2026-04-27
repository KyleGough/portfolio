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
    <h2 id="project-screenshots-heading" className="project-header">
      Screenshots
    </h2>
    <div className="project-screenshots__grid grid grid-cols-12 gap-5 sm:gap-6">
      {images.map((image, i) => (
        <ImageModal key={i} image={image.imageData} alt={image.alt} />
      ))}
    </div>
  </Section>
);
