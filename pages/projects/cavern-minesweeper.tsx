import { Divider } from '@components/Divider';
import { ImageFigure } from '@components/ImageFigure';
import { Layout } from '@components/Layout';
import { Pagination } from '@components/Pagination';
import { ProjectHeader } from '@components/ProjectHeader';
import { Screenshots } from '@components/Screenshots';
import { Section } from '@components/Section';
import imageFinishGame from '@image/cavern-minesweeper1.jpg';
import imageStartGame from '@image/cavern-minesweeper2.jpg';
import { getProjectData } from '@utilities/Project';
import { ProjectPageProps } from '@utilities/types';
import { GetStaticProps } from 'next';
import React from 'react';

const CavernMinesweeper: React.FC<ProjectPageProps> = ({ images, project }) => (
  <Layout title="Cavern Minesweeper - Minesweeper clone written in Ruby">
    <ProjectHeader project={project} />

    <Divider />

    <ImageFigure image={images[0]} />

    <Divider />

    <Section>
      <h2 className="project-header">Project Highlights</h2>
      <ul className="project-list max-w-reading">
        <li>
          <strong>Tiered Ores:</strong> Discover an array of tiered ores, each
          with its own level requirement. Dig too deep without the proper level,
          and you&apos;ll face the consequences as these ores can damage you.
        </li>
        <li>
          <strong>Three Playable Difficulties:</strong> Choose from three
          distinct difficulty levels, catering to both newcomers and seasoned
          miners. Test your strategic prowess as you ascend from novice to
          expert.
        </li>
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

export const getStaticProps: GetStaticProps = () => {
  const images = [
    { imageData: imageFinishGame, alt: 'Finished game' },
    { imageData: imageStartGame, alt: 'New game' },
  ];

  return {
    props: {
      images: images,
      project: getProjectData('cavern-minesweeper'),
    },
  };
};

export default CavernMinesweeper;
