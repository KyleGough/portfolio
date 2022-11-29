import { Divider } from '@components/Divider';
import { ImageFigure } from '@components/ImageFigure';
import { Layout } from '@components/Layout';
import { Pagination } from '@components/Pagination';
import { ProjectHeader } from '@components/ProjectHeader';
import { Screenshots } from '@components/Screenshots';
import imageComplete from '@image/react-minesweeper1.jpg';
import imagePartial from '@image/react-minesweeper2.jpg';
import imageLost from '@image/react-minesweeper3.jpg';
import imageInitial from '@image/react-minesweeper4.jpg';
import imageIntro from '@image/react-minesweeper5.jpg';
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
    { imageData: imageComplete, alt: 'Complete game' },
    {
      imageData: imagePartial,
      alt: 'Partially complete game',
    },
    { imageData: imageLost, alt: 'Lost game' },
    { imageData: imageInitial, alt: 'Initial board' },
    { imageData: imageIntro, alt: 'App introduction' },
  ];

  return {
    props: {
      images: images,
      project: getProjectData('react-minesweeper'),
    },
  };
};

export default Minesweeper;
