import { Divider } from '@components/Divider';
import { ImageFigure } from '@components/ImageFigure';
import { Layout } from '@components/Layout';
import { Pagination } from '@components/Pagination';
import { ProjectHeader } from '@components/ProjectHeader';
import { Screenshots } from '@components/Screenshots';
import { Section } from '@components/Section';
import imageWebsite from '@image/ai-space-telescope1.jpg';
import { getProjectData } from '@utilities/Project';
import { ProjectPageProps } from '@utilities/types';
import { GetStaticProps } from 'next';
import React from 'react';

const AISpaceTelescope: React.FC<ProjectPageProps> = ({ images, project }) => (
  <Layout title="AI Space Telescope">
    <ProjectHeader project={project} />

    <Divider />

    <ImageFigure image={images[0]} />

    <Divider />

    <Section>
      <h2 className="project-header">Implementation</h2>
      <p className="max-w-reading mb-4">
        The images present on the website have been generated using OpenAI DALLE
        2 API by providing space related prompts. Lots of different images have
        been generated from text prompts or reference images of previously
        generated images. Of these generated images only a few have been
        hand-selected to be shown on this website.
      </p>
      <p className="max-w-reading">
        AI Space Telescope is a web-app developed using React, TailwindCSS, and
        TypeScript. Images are stored and served via Sirv, an image CDN which
        helps optimise images by serving images in the best format and size. The
        website is deployed on Vercel, and uses Cloudflare services for DNS, and
        security.
      </p>
    </Section>

    <Divider />

    <Screenshots images={images} />

    <Divider />

    <Pagination
      previousTitle="Bookmark Labeller"
      previousLink="/projects/bookmark-labeller"
    />
  </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
  const images = [
    {
      imageData: imageWebsite,
      alt: 'AI Space Telescope Website',
    },
  ];

  return {
    props: {
      images: images,
      project: getProjectData('ai-space-telescope'),
    },
  };
};

export default AISpaceTelescope;
