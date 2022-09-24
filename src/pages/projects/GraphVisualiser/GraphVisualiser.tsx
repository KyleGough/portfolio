import React, { useEffect } from 'react';

import { Divider } from '../../../components/Divider';
import { ImageFigure } from '../../../components/ImageFigure';
import { Pagination } from '../../../components/Pagination';
import { ProjectHeader } from '../../../components/ProjectHeader';
import { Screenshots } from '../../../components/Screenshots';
import { Section } from '../../../components/Section';
import { getProjectData } from '../../../data';
import images from './images.json';

const project = getProjectData('graph-algorithm-visualiser');

export const GraphVisualiser: React.FC = () => {
  useEffect(() => {
    document.title =
      'Graph Algorithm Visualiser - Web App to Visualise Various Graph Algorithms';
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
          <li>
            Visualisation of the graph, unvisited nodes, visited nodes and edges
            connecting them.
          </li>
          <li>Choice of low number to high number of nodes in the graph.</li>
          <li>
            Algorithm statistics such as: Tour length, Minimum Spanning Tree
            length, Convex Hull nodes.
          </li>
          <li>
            <strong>Minimum Spanning Tree Algorithms</strong> - Prim&apos;s,
            Kruskal&apos;s
          </li>
          <li>
            <strong>Hamiltonian Path</strong> - Nearest Neighbour, Nearest
            Neighbour with 2-Opt, Random Tour
          </li>
          <li>
            <strong>Convex Hull Algorithms</strong> - Graham Scan
          </li>
          <li>
            <strong>Minimum Matching</strong> - Greedy (variant of
            Kruskal&apos;s algorithm)
          </li>
        </ul>
      </Section>

      <Divider />

      <Screenshots images={images} />

      <Divider />

      <Pagination
        previousTitle="Cavern Minesweeper"
        previousLink="/projects/cavern-minesweeper"
        nextTitle="URL Shortener"
        nextLink="/projects/url-shortener"
      />
    </>
  );
};
