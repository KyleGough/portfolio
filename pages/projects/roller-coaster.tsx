import { Divider } from '@components/Divider';
import { ImageFigure } from '@components/ImageFigure';
import { Layout } from '@components/Layout';
import { Pagination } from '@components/Pagination';
import { ProjectHeader } from '@components/ProjectHeader';
import { Screenshots } from '@components/Screenshots';
import { Section } from '@components/Section';
import imageBackCart from '@image/roller-coaster1.jpg';
import imageTracking from '@image/roller-coaster2.jpg';
import imageCentreCart from '@image/roller-coaster3.jpg';
import imageCloseup from '@image/roller-coaster4.jpg';
import { getProjectData } from '@utilities/Project';
import { ProjectPageProps } from '@utilities/types';
import { GetStaticProps } from 'next';
import React from 'react';

const RollerCoaster: React.FC<ProjectPageProps> = ({ images, project }) => (
  <Layout title="Roller Coaster Simulation">
    <ProjectHeader project={project} />

    <Divider />

    <ImageFigure image={images[0]} />

    <Divider />

    <Section>
      <h2 className="project-header">Project Highlights</h2>
      <ul className="project-list max-w-reading">
        <li>
          <strong>First-person thrills:</strong> Strap in for the ride of your
          life as you experience the roller coaster from a first-person
          perspective in each of the three cars. Feel the virtual G-forces as
          you navigate the twists and turns.
        </li>
        <li>
          <strong>Multiple viewing angles:</strong> For those who prefer a
          different view, the simulation offers additional camera angles that
          track the coaster&apos;s progress along the track, providing a
          comprehensive and visually stunning perspective.
        </li>
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

export const getStaticProps: GetStaticProps = () => {
  const images = [
    { imageData: imageBackCart, alt: 'Back cart camera view' },
    { imageData: imageTracking, alt: 'Tracking camera view' },
    { imageData: imageCentreCart, alt: 'Centre cart camera view' },
    { imageData: imageCloseup, alt: 'Cart closeup' },
  ];

  return {
    props: {
      images: images,
      project: getProjectData('roller-coaster'),
    },
  };
};

export default RollerCoaster;
