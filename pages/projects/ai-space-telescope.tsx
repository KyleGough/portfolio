import { Divider } from '@components/Divider';
import { ImageFigure } from '@components/ImageFigure';
import { Layout } from '@components/Layout';
import { Pagination } from '@components/Pagination';
import { ProjectHeader } from '@components/ProjectHeader';
import { Screenshots } from '@components/Screenshots';
import { Section } from '@components/Section';
import imageWebsite from '@image/ai-space-telescope.jpg';
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
        The images present on the website have been generated using various
        text-to-image models including: OpenAI&apos;s DALLE 2, PicLumen
        Realistic V2, FLUX.1-schnell, and Google DeepMind&apos;s Imagen 3.
        Images have been generated with varying subjects such as: black holes,
        nebulae, galaxies, planets, and spaceships through crafting prompts. Of
        the hundreds of generated images a hand-selected subset have been chosen
        to be shown on this website.
      </p>
      <p className="max-w-reading">
        AI Space Telescope is a web-app developed using React, TailwindCSS, and
        TypeScript. Images are uploaded via a script to Sirv, an image CDN which
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
      nextTitle="Solar System"
      nextLink="/projects/solar-system"
    />
  </Layout>
);

export const getStaticProps: GetStaticProps = () => {
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
