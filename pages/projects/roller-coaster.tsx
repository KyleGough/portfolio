import { Divider } from 'components/Divider';
import { ImageFigure } from 'components/ImageFigure';
import { Layout } from 'components/Layout';
import { Pagination } from 'components/Pagination';
import { ProjectHeader } from 'components/ProjectHeader';
import { Screenshots } from 'components/Screenshots';
import { Section } from 'components/Section';
import { GetStaticProps } from 'next';
import React from 'react';
import { getProjectData } from 'utilities/Project';
import { ProjectPageProps } from 'utilities/types';

const RollerCoaster: React.FC<ProjectPageProps> = ({ images, project }) => (
  <Layout title="Roller Coaster Simulation">
    <ProjectHeader project={project} />

    <Divider />

    <ImageFigure image={images[0]} />

    <Divider />

    <Section>
      <h2 className="project-header">Features</h2>
      <ul className="project-list">
        <li>Looping track with lift-hill, drop, loop-the-loop and turns</li>
        <li>Texture mapping of cart and wheels</li>
        <li>Skybox</li>
        <li>First-person camera view</li>
        <li>Overview camera mode</li>
        <li>Rotating cart wheels</li>
        <li>Lighting</li>
      </ul>
    </Section>

    <Divider />

    <Screenshots images={images} />

    <Divider />

    <Pagination
      previousTitle="RSCBot"
      previousLink="/projects/rscbot"
      nextTitle="Cave Exploration"
      nextLink="/projects/cave-exploration"
    />
  </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
  const images = [
    { src: '/img/roller-coaster1.jpg', alt: 'Back cart camera view' },
    { src: '/img/roller-coaster2.jpg', alt: 'Tracking camera view' },
    { src: '/img/roller-coaster3.jpg', alt: 'Center cart camera view' },
    { src: '/img/roller-coaster4.jpg', alt: 'Cart closeup' },
  ];

  return {
    props: {
      images: images,
      project: getProjectData('roller-coaster'),
    },
  };
};

export default RollerCoaster;
