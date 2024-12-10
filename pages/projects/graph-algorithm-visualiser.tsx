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
      <h2 className="project-header">Project Highlights</h2>
      <ul className="project-list max-w-reading">
        <li>
          <strong>Comprehensive Visualisations:</strong> Immerse yourself in the
          graph&apos;s dynamic visualizations, revealing unvisited nodes,
          visited nodes, and the edges that connect them. Witness the algorithms
          in action as they traverse the nodes and create complex structures.
        </li>
        <li>
          <strong>Node Count:</strong> Tailor your exploration with the choice
          of a low to high number of nodes, allowing you to study algorithm
          behaviour and performance under varying conditions.
        </li>
        <li>
          <strong>Algorithm Insights:</strong> Delve into algorithm statistics,
          providing valuable insights such tour length, minimum spanning tree
          length, and convex hull nodes, helping you understand the efficiency
          and outcomes of each algorithm.
        </li>
      </ul>
    </Section>

    <Divider />

    <Section>
      <h2 className="project-header">Algorithms</h2>
      <ul className="project-list max-w-reading">
        <li>
          <strong>Minimum Spanning Trees:</strong> Witness the elegance of
          Prim&apos;s and Kruskal&apos;s algorithms in action as they construct
          minimum spanning trees, connecting nodes in the most efficient way
          possible.
        </li>
        <li>
          <strong>Hamiltonian Paths:</strong> Explore the art of Hamiltonian
          paths with Nearest Neighbour, Nearest Neighbour with 2-Opt, and Random
          Tour algorithms, unraveling the mysteries of traversing all nodes
          once.
        </li>
        <li>
          <strong>Convex Hulls:</strong> Experience the mesmerising Graham Scan
          algorithm as it constructs convex hulls, an essential concept in
          computational geometry.
        </li>
        <li>
          <strong>Minimum Matching:</strong> Discover the power of the Greedy
          algorithm, a variant of Kruskal&apos;s, as it constructs minimal
          matchings, optimizing connections in the graph.
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

export const getStaticProps: GetStaticProps = () => {
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
