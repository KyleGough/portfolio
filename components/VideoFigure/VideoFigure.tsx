import { Section } from '@components/Section';
import React from 'react';

interface VideoFigureProps {
  src: string;
  caption: string;
}

export const VideoFigure: React.FC<VideoFigureProps> = ({ src, caption }) => (
  <Section>
    <video
      className="border-2 border-white rounded-lg text-center items-center shadow mx-auto"
      src={src}
      controls={true}
      autoPlay={true}
      loop={true}
    />
    <p className="mt-4 mb-2 text-sm text-center text-light font-thin">
      {caption}
    </p>
  </Section>
);
