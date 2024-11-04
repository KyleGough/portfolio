import { Divider } from '@components/Divider';
import { ImageFigure } from '@components/ImageFigure';
import { Layout } from '@components/Layout';
import { Pagination } from '@components/Pagination';
import { ProjectHeader } from '@components/ProjectHeader';
import { Screenshots } from '@components/Screenshots';
import { Section } from '@components/Section';
import imageEarth from '@image/earth.png';
import imageMars from '@image/mars.png';
import imageMoon from '@image/moon.png';
import imageSun from '@image/sun.png';
import { getProjectData } from '@utilities/Project';
import { ProjectPageProps } from '@utilities/types';
import { GetStaticProps } from 'next';
import React from 'react';

const SolarSystem: React.FC<ProjectPageProps> = ({ images, project }) => (
  <Layout title="Solar System Model">
    <ProjectHeader project={project} />

    <Divider />

    <ImageFigure image={images[0]} />

    <Divider />

    <Section>
      <h2 className="project-header">Key Features</h2>
      <ul className="project-list max-w-reading">
        <li className="mb-4">
          <strong>Orbital Dynamics</strong>
          <br />
          Observe the natural motion of planets as they follow their respective
          orbits, giving you a sense of the scale and structure of our solar
          system.
        </li>
        <li className="mb-4">
          <strong>Planetary Waypoints</strong>
          <br />
          Access detailed waypoints for each planet, highlighting significant
          locations such as the landing sites of Mars rovers, including
          Curiosity and Perseverance.
        </li>
        <li className="mb-4">
          <strong>Cinematic Camera Control</strong>
          <br />
          Rotate the camera around the planets like an orbiting satellite,
          allowing you to view each planet in its entirety from different
          angles.
        </li>
        <li className="mb-4">
          <strong>Speed Control</strong>
          <br />
          Adjust the speed of the model to explore the solar system at your own
          pace, whether you want to experience rapid movements or slow,
          deliberate exploration.
        </li>
        <li className="mb-4">
          <strong>Day and Night Cycle</strong>
          <br />
          Witness the mesmerizing day and night cycles on each planet,
          showcasing the interplay of light and shadow as they rotate.
        </li>
      </ul>
    </Section>

    <Divider />

    <Screenshots images={images} />

    <Divider />

    <Pagination
      previousTitle="AI Space Telescope"
      previousLink="/projects/ai-space-telescope"
    />
  </Layout>
);

export const getStaticProps: GetStaticProps = () => {
  const images = [
    {
      imageData: imageMars,
      alt: 'Mars',
    },
    {
      imageData: imageEarth,
      alt: 'Earth',
    },
    {
      imageData: imageMoon,
      alt: 'Moon',
    },
    {
      imageData: imageSun,
      alt: 'Sun',
    },
  ];

  return {
    props: {
      images: images,
      project: getProjectData('solar-system'),
    },
  };
};

export default SolarSystem;
