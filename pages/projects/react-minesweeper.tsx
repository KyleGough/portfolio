import React from 'react';

import { Divider } from '../../components/Divider';
import { ImageFigure } from '../../components/ImageFigure';
import { Layout } from '../../components/Layout';
import { Pagination } from '../../components/Pagination';
import { ProjectHeader } from '../../components/ProjectHeader';
import { Screenshots } from '../../components/Screenshots';
import { getProjectData } from '../../data';

const images = [
  { src: '/img/react-minesweeper1.jpg', caption: 'Complete game' },
  {
    src: '/img/react-minesweeper2.jpg',
    caption: 'Partially complete game',
  },
  { src: '/img/react-minesweeper3.jpg', caption: 'Lost game' },
  { src: '/img/react-minesweeper4.jpg', caption: 'Initial board' },
  { src: '/img/react-minesweeper5.jpg', caption: 'App introduction' },
];

const project = getProjectData('react-minesweeper');

const Minesweeper: React.FC = () => (
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

export default Minesweeper;
