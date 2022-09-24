import React, { useEffect } from 'react';

import { Divider } from '../../../components/Divider';
import { ImageFigure } from '../../../components/ImageFigure';
import { Pagination } from '../../../components/Pagination';
import { ProjectHeader } from '../../../components/ProjectHeader';
import { Screenshots } from '../../../components/Screenshots';
import { getProjectData } from '../../../data';
import images from './images.json';

const project = getProjectData('react-minesweeper');

export const Minesweeper: React.FC = () => {
  useEffect(() => {
    document.title =
      'React Minesweeper - Classic Minesweeper Clone Using React';
  }, []);

  return (
    <>
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
    </>
  );
};
