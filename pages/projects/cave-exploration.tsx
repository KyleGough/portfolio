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
      <h2 className="project-header">Project Highlights</h2>
      <ul className="project-list max-w-reading">
        <li>
          <strong>Realistic Cave Environments:</strong> Starting from Simplex
          noise, then employing cellular automata and several flood fills to
          craft unique, realistic cave environments that serve as the backdrop
          for exploration.
        </li>
        <li>
          <strong>Individual Drone Search:</strong> Observe a single drone
          efficiently navigating and exploring every nook and cranny within the
          cave, employing a semi-efficient approach that ensures no stone goes
          unturned.
        </li>
        <li>
          <strong>Collaborative Drone Search:</strong> Harness the synergy of
          multiple drones working in unison. These autonomous explorers share
          information, avoid redundant exploration, and collaborate seamlessly
          to efficiently map the cave.
        </li>
        <li>
          <strong>Immersive Visualisation:</strong> Visualise the drone&apos;s
          journey as they uncover new territory, see explored cells, identify
          potential frontier areas, and pinpoint their next target location.
        </li>
        <li>
          <strong>Detailed Statistics:</strong> Review in-depth statistics for
          each drone, including the distance travelled and the percentage of the
          cave each has successfully explored, providing valuable insights into
          their efficiency and effectiveness.
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
