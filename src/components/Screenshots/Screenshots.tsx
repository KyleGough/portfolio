import React from 'react';
import { Section } from '../Section';
import { ImageModal } from '../ImageModal/ImageModal';

interface ScreenshotProps {
  images: {
    src: string;
    caption: string;
  }[];
}

export const Screenshots: React.FC<ScreenshotProps> = ({ images }) => (
  <Section>
    <h2 className="text-3xl mb-12">Screenshots</h2>
    <div className="grid grid-cols-12 gap-4">
      {images.map((image, i) => {
        return <ImageModal key={i} src={image.src} caption={image.caption} />;
      })}
    </div>
  </Section>
);
