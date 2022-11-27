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

const CavernMinesweeper: React.FC<ProjectPageProps> = ({ images, project }) => (
  <Layout title="Cavern Minesweeper - Minesweeper clone written in Ruby">
    <ProjectHeader project={project} />

    <Divider />

    <ImageFigure image={images[0]} />

    <Divider />

    <Section>
      <h2 className="project-header">Features</h2>
      <ul className="project-list">
        <li>Three playable difficulties.</li>
        <li>
          Tiered Ores which damage the player if their level is not sufficient
          enough.
        </li>
        <li>Flood Fill algorithm for revealing tiles.</li>
        <li>Shoes GUI.</li>
      </ul>
    </Section>

    <Divider />

    <Screenshots images={images} />

    <Divider />

    <Pagination
      previousTitle="BSplit"
      previousLink="/projects/bsplit"
      nextTitle="Graph Algorithm Visualiser"
      nextLink="/projects/graph-algorithm-visualiser"
    />
  </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
  const images = [
    { src: '/img/cavern-minesweeper1.jpg', alt: 'Finished game' },
    { src: '/img/cavern-minesweeper2.jpg', alt: 'New game' },
  ];

  return {
    props: {
      images: images,
      project: getProjectData('cavern-minesweeper'),
    },
  };
};

export default CavernMinesweeper;
