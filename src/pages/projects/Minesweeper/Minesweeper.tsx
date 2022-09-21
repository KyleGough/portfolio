import React, { useEffect } from 'react';

import { Chip } from '../../../components/Chip';
import { Divider } from '../../../components/Divider';
import { ImageFigure } from '../../../components/ImageFigure';
import { Pagination } from '../../../components/Pagination';
import { Screenshots } from '../../../components/Screenshots';
import { Section } from '../../../components/Section';
import images from './images.json';

export const Minesweeper: React.FC = () => {
  useEffect(() => {
    document.title =
      'React Minesweeper - Classic Minesweeper Clone Using React';
  }, []);

  return (
    <>
      <Section>
        <h1 className="project-title">React Minesweeper</h1>
        <p className="text-link-hover my-4">
          <time dateTime="2019-10">October 2019</time>
        </p>
        <p className="mb-4 max-w-reading">
          Clone of classic Minesweeper with an 18x18 board. Ability to reveal
          tiles and flag tiles for potential mines. Flood fill algorithms will
          reveal all adjacent tiles when a 0 is uncovered, mimicing the
          behaviour of the original game.
        </p>
        <p className="mb-4">
          <span>Explore this project on </span>
          <a
            className="text-link hover:text-link-hover focus:text-link-hover"
            href="https://github.com/KyleGough/react-minesweeper"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </p>

        <div className="flex flex-row flex-wrap items-center mt-8 gap-4">
          <Chip name="React" />
          <Chip name="JavaScript" />
          <Chip name="CSS" />
          <Chip name="Materialize" />
        </div>
      </Section>

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
