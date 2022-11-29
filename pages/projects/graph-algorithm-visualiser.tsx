import { Divider } from '@components/Divider';
import { ImageFigure } from '@components/ImageFigure';
import { Layout } from '@components/Layout';
import { Pagination } from '@components/Pagination';
import { ProjectHeader } from '@components/ProjectHeader';
import { Screenshots } from '@components/Screenshots';
import { Section } from '@components/Section';
import imageNN2Opt from '@image/graph-algorithm-visualiser1.jpg';
import imageNodes from '@image/graph-algorithm-visualiser2.jpg';
import imageInfo from '@image/graph-algorithm-visualiser3.jpg';
import imageGrahamScan from '@image/graph-algorithm-visualiser4.jpg';
import imageRandomRoute from '@image/graph-algorithm-visualiser5.jpg';
import { getProjectData } from '@utilities/Project';
import { ProjectPageProps } from '@utilities/types';
import { GetStaticProps } from 'next';
import React from 'react';

const GraphVisualiser: React.FC<ProjectPageProps> = ({ images, project }) => (
  <Layout title="Graph Algorithm Visualiser - Web App to Visualise Various Graph Algorithms">
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
          <strong>Minimum Matching</strong> - Greedy (variant of Kruskal&apos;s
          algorithm)
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
  </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
  const images = [
    {
      imageData: imageNN2Opt,
      alt: 'Nearest Neighbour with 2-Opt',
    },
    {
      imageData: imageNodes,
      alt: 'Randomly generated nodes',
    },
    {
      imageData: imageInfo,
      alt: 'Algorithm information',
    },
    { imageData: imageGrahamScan, alt: 'Graham Scan' },
    { imageData: imageRandomRoute, alt: 'Random route' },
  ];

  return {
    props: {
      images: images,
      project: getProjectData('graph-algorithm-visualiser'),
    },
  };
};

export default GraphVisualiser;
