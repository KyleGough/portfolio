import React, { useEffect } from 'react';

import { Divider } from '../../../components/Divider';
import { ImageFigure } from '../../../components/ImageFigure';
import { Pagination } from '../../../components/Pagination';
import { ProjectHeader } from '../../../components/ProjectHeader';
import { Screenshots } from '../../../components/Screenshots';
import { Section } from '../../../components/Section';
import { getProjectData } from '../../../data';
import images from './images.json';

const project = getProjectData('cavern-minesweeper');

export const CavernMinesweeper: React.FC = () => {
  useEffect(() => {
    document.title = 'Cavern Minesweeper - Minesweeper clone written in Ruby';
  }, []);

  return (
    <>
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
    </>
  );
};
