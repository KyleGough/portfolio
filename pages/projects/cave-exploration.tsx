import { Divider } from '@components/Divider';
import { ImageFigure } from '@components/ImageFigure';
import { Layout } from '@components/Layout';
import { Pagination } from '@components/Pagination';
import { ProjectHeader } from '@components/ProjectHeader';
import { Screenshots } from '@components/Screenshots';
import { Section } from '@components/Section';
import imageMultiDrone from '@image/cave-exploration1.jpg';
import imageSingleDroneA from '@image/cave-exploration2.jpg';
import imageSingleDroneB from '@image/cave-exploration3.jpg';
import imageCaveGen1 from '@image/cave-generation1.png';
import imageCaveGen2 from '@image/cave-generation2.png';
import imageCaveGen3 from '@image/cave-generation3.png';
import imageCaveGen4 from '@image/cave-generation4.png';
import { getProjectData } from '@utilities/Project';
import { ProjectPageProps } from '@utilities/types';
import { GetStaticProps } from 'next';
import React from 'react';

const CaveExploration: React.FC<ProjectPageProps> = ({ images, project }) => (
  <Layout title="Cave Exploration - Improving and Simulating Cave Explortation with Swarm AI">
    <ProjectHeader project={project} />

    <Divider />

    <ImageFigure image={images[0]} />

    <Divider />

    <Section>
      <h2 className="project-header">Features</h2>
      <ul className="project-list max-w-reading">
        <li className="mb-4">
          <strong>Realistic cave environment generation</strong>
          <br />
          Starting from Simplex noise, a cellular automata and several flood
          fills create unique, realistic cave environments for the simulation to
          run on.
        </li>
        <li className="mb-4">
          <strong>Individual drone searching</strong>
          <br />A single drone can successfully explore every cell in the cave
          using a semi-efficient approach.
        </li>
        <li className="mb-4">
          <strong>Multiple drone searching</strong>
          <br />
          Multiple drones can work together to more efficiently explore the cave
          by communicating information between them and avoiding exploring the
          same locations.
        </li>
        <li className="mb-4">
          <strong>Visualisation</strong>
          <br />
          View the process of the drone&apos;s exploration. Ability to see what
          cells the drone has explored, potential frontier cells and the next
          target cell.
        </li>
        <li className="mb-4">
          <strong>Statistics</strong>
          <br />
          View statistics of each drone including the distance they have
          travelled and percentage of the cave they have explored.
        </li>
      </ul>
    </Section>

    <Divider />

    <Screenshots images={images} />

    <Divider />

    <Pagination
      previousTitle="Roller Coaster"
      previousLink="/projects/roller-coaster"
      nextTitle="React Minesweeper"
      nextLink="/projects/react-minesweeper"
    />
  </Layout>
);

export const getStaticProps: GetStaticProps = () => {
  const images = [
    {
      imageData: imageMultiDrone,
      alt: 'Multiple drone cave exploration',
    },
    {
      imageData: imageSingleDroneA,
      alt: 'Single drone cave exploration',
    },
    {
      imageData: imageSingleDroneB,
      alt: 'Single drone cave exploration',
    },
    { imageData: imageCaveGen1, alt: 'Cave generation step 1' },
    { imageData: imageCaveGen2, alt: 'Cave generation step 2' },
    { imageData: imageCaveGen3, alt: 'Cave generation step 3' },
    { imageData: imageCaveGen4, alt: 'Cave generation step 4' },
  ];

  return {
    props: {
      images: images,
      project: getProjectData('cave-exploration'),
    },
  };
};

export default CaveExploration;
