import React, { useEffect } from 'react';

import { Chip } from '../../../components/Chip';
import { Divider } from '../../../components/Divider';
import { ImageFigure } from '../../../components/ImageFigure';
import { Pagination } from '../../../components/Pagination';
import { Screenshots } from '../../../components/Screenshots';
import { Section } from '../../../components/Section';
import images from './images.json';

export const RollerCoaster: React.FC = () => {
  useEffect(() => {
    document.title = 'Roller Coaster Simulation';
  }, []);

  return (
    <>
      <Section>
        <h1 className="project-title">Roller Coaster</h1>
        <h2 className="project-subtitle">Computer Graphics Coursework</h2>
        <p className="text-link-hover my-4">
          <time dateTime="2018-12">December 2018</time> -{' '}
          <time dateTime="2019-01">January 2019</time>
        </p>
        <p className="mb-4 max-w-reading">
          Simulation of a 3-car roller coaster which traverses a small looped
          track featuring a lift hill, drop, loop-the-loop and turns. The
          coaster can be viewed from a first-person perspective in each of the
          carts, as well as additional views that track the carts round the
          track.
        </p>

        <div className="flex flex-row flex-wrap items-center mt-8 gap-4">
          <Chip name="C++" />
          <Chip name="GLUT" />
        </div>
      </Section>

      <Divider />

      <ImageFigure image={images[0]} />

      <Divider />

      <Section>
        <h2 className="project-header">Features</h2>
        <ul className="project-list">
          <li>Looping track with lift-hill, drop, loop-the-loop and turns</li>
          <li>Texture mapping of cart and wheels</li>
          <li>Skybox</li>
          <li>First-person camera view</li>
          <li>Overview camera mode</li>
          <li>Rotating cart wheels</li>
          <li>Lighting</li>
        </ul>
      </Section>

      <Divider />

      <Screenshots images={images} />

      <Divider />

      <Pagination
        previousTitle="RSCBot"
        previousLink="/projects/rscbot"
        nextTitle="Cave Exploration"
        nextLink="/projects/cave-exploration"
      />
    </>
  );
};
