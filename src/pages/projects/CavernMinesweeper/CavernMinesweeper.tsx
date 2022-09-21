import React, { useEffect } from 'react';

import { Chip } from '../../../components/Chip';
import { Divider } from '../../../components/Divider';
import { ImageFigure } from '../../../components/ImageFigure';
import { Link } from '../../../components/Link';
import { Pagination } from '../../../components/Pagination';
import { Screenshots } from '../../../components/Screenshots';
import { Section } from '../../../components/Section';
import images from './images.json';

export const CavernMinesweeper: React.FC = () => {
  useEffect(() => {
    document.title = 'Cavern Minesweeper - Minesweeper clone written in Ruby';
  }, []);

  return (
    <>
      <Section>
        <h1 className="project-title">Cavern Minesweeper</h1>
        <p className="text-link-hover my-4">
          <time dateTime="2017-03">March 2017</time>
        </p>
        <p className="mb-4 max-w-reading">
          Cavern Minesweeper is based off of the original Minesweeper game but
          with tiered mines (ores) which can only be mined if the player has
          uncovered enough squares to advance to the required mining level. The
          game has three levels of difficulty to challenge competitive players.
          The project served as a tool to teach me Ruby.
        </p>
        <p className="mb-4">
          <span>Explore this project on </span>
          <Link href="https://github.com/KyleGough/cavern-minesweeper">
            GitHub
          </Link>
        </p>

        <div className="flex flex-row flex-wrap items-center mt-8 gap-4">
          <Chip name="Ruby" />
        </div>
      </Section>

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
    </>
  );
};
