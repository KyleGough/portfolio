import { Divider } from '@components/Divider';
import { ImageFigure } from '@components/ImageFigure';
import { Layout } from '@components/Layout';
import { Pagination } from '@components/Pagination';
import { ProjectHeader } from '@components/ProjectHeader';
import { Screenshots } from '@components/Screenshots';
import { getProjectData } from '@utilities/Project';
import { ProjectPageProps } from '@utilities/types';
import { GetStaticProps } from 'next';
import React from 'react';

const Minesweeper: React.FC<ProjectPageProps> = ({ images, project }) => (
  <Layout title="React Minesweeper - Classic Minesweeper Clone Using React">
    <ProjectHeader project={project} />

    <Divider />

    <ImageFigure image={images[0]} />

    <Divider />

    <Screenshots images={images} />

    <Divider />

    <Pagination
      previousTitle="Cave Exploration"
      previousLink="/projects/cave-exploration"
      nextTitle="Logical Sudoku Solver"
      nextLink="/projects/sudoku"
    />
  </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
  const images = [
    { src: '/img/react-minesweeper1.jpg', alt: 'Complete game' },
    {
      src: '/img/react-minesweeper2.jpg',
      alt: 'Partially complete game',
    },
    { src: '/img/react-minesweeper3.jpg', alt: 'Lost game' },
    { src: '/img/react-minesweeper4.jpg', alt: 'Initial board' },
    { src: '/img/react-minesweeper5.jpg', alt: 'App introduction' },
  ];

  return {
    props: {
      images: images,
      project: getProjectData('react-minesweeper'),
    },
  };
};

export default Minesweeper;
