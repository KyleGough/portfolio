import React, { useEffect } from 'react';

import { Chip } from '../../../components/Chip';
import { Divider } from '../../../components/Divider';
import { ImageFigure } from '../../../components/ImageFigure';
import { Pagination } from '../../../components/Pagination';
import { Screenshots } from '../../../components/Screenshots';
import { Section } from '../../../components/Section';
import images from './images.json';

export const CaveExploration: React.FC = () => {
  useEffect(() => {
    document.title =
      'Cave Exploration - Improving and Simulating Cave Explortation with Swarm AI';
  }, []);

  return (
    <>
      <Section>
        <h1 className="project-title">Using Swarm AI to Map a Cave Network</h1>
        <h2 className="project-subtitle">Dissertation</h2>
        <p className="text-link-hover my-4">
          <time dateTime="2018-12">December 2018</time> -{' '}
          <time dateTime="2019-04">April 2019</time>
        </p>
        <p className="mb-4 max-w-reading">
          Cave exploration is dangerous and time-consuming. This project
          demonstrates how swarm AI could be used in a group of autonomous
          flying drones to navigate and explore a cave as efficiently as
          possible. The project also includes random, realistic cave environment
          generation.
        </p>
        <p className="mb-4">
          <span>Explore this project on </span>
          <a
            className="text-link hover:text-link-hover focus:text-link-hover"
            href="https://github.com/KyleGough/CS310-Dissertation"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
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
        <ul className="project-list max-w-reading">
          <li className="mb-4">
            <strong>Realistic cave environment generation</strong>
            <br />
            Starting from Simplex noise, a cellular automata and several flood
            fills create unique, realistic cave environments for the simulation
            to run on.
          </li>
          <li className="mb-4">
            <strong>Individual drone searching</strong>
            <br />A single drone can successfully explore every cell in the cave
            using a semi-efficient approach.
          </li>
          <li className="mb-4">
            <strong>Multiple drone searching</strong>
            <br />
            Multiple drones can work together to more efficiently explore the
            cave by communicating information between them and avoiding
            exploring the same locations.
          </li>
          <li className="mb-4">
            <strong>Visualisation</strong>
            <br />
            View the process of the drone&apos;s exploration. Ability to see
            what cells the drone has explored, potential frontier cells and the
            next target cell.
          </li>
          <li className="mb-4">
            <strong>Statistics</strong>
            <br />
            View statistics of each drone including the distance they have
            travelled and percentage of the cave they have explored.
          </li>
        </ul>
      </Section>

      <Divider />

      <Screenshots images={images} />

      <Divider />

      <Pagination
        previousTitle="Roller Coaster"
        previousLink="/projects/roller-coaster"
        nextTitle="React Minesweeper"
        nextLink="/projects/react-minesweeper"
      />
    </>
  );
};
