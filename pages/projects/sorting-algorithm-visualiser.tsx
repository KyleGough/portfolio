import React from 'react';

import { Divider } from '../../components/Divider';
import { Layout } from '../../components/Layout';
import { Pagination } from '../../components/Pagination';
import { ProjectHeader } from '../../components/ProjectHeader';
import { Screenshots } from '../../components/Screenshots';
import { Section } from '../../components/Section';
import { VideoFigure } from '../../components/VideoFigure';
import { getProjectData } from '../../data';
import algorithms from '../../data/algorithms.json';

const images = [
  {
    src: '/img/sorting-algorithm-visualiser1.jpg',
    caption: 'Unsorted Random Data',
  },
  {
    src: '/img/sorting-algorithm-visualiser2.jpg',
    caption: 'Random and sinusoidal datasets',
  },
  {
    src: '/img/sorting-algorithm-visualiser3.jpg',
    caption: 'Bitonic sort and sorted dataset',
  },
  {
    src: '/img/sorting-algorithm-visualiser4.jpg',
    caption: 'Dataset visualised as points',
  },
  {
    src: '/img/sorting-algorithm-visualiser5.jpg',
    caption: 'Algorithm information table',
  },
];

const project = getProjectData('sorting-algorithm-visualiser');

const SortingVisualiser: React.FC = () => (
  <Layout title="Sorting Algorithm Visualiser - Visualise 20 Unique Sorting Algorithms">
    <ProjectHeader project={project} />

    <Divider />

    <VideoFigure src="/video/heap-sort.mp4" caption="Heap Sort" />

    <Divider />

    <Section>
      <h2 className="project-header">Overview</h2>
      <p className="my-4 max-w-reading">
        Prior to this project, I had developed a simple CLI sorting algorithm
        visualiser in VB.net featuring a limited selection of algorithms and
        options. Once I had familiarised myself with C#, I decided to upgrade
        and rewrite the visualiser with a GUI, additional algorithms and
        enhanced customisation. The project served as a great tool for improving
        my C# and GUI design skills as well as futhering my understanding of how
        sorting algorithms operate, scale and perform.
      </p>
    </Section>

    <Divider />

    <Section>
      <h2 className="project-header">Features</h2>
      <ul className="project-list">
        <li>Real-time visualiser which can be paused and stopped.</li>
        <li>20 unique sorting algorithms.</li>
        <li>
          18 starting datasets to analyse the performance of each algorithm.
        </li>
        <li>Ability to compare two algorithms simultaneously.</li>
        <li>Customisable dataset size, range and delay.</li>
        <li>
          Statistics provided for each algorithm (incl. Big-O Complexities,
          Stability, In-place).
        </li>
        <li>
          Analysis results after sorting data (incl. Comparisons, Swaps,
          Duration).
        </li>
        <li>Custom colours and data display styles.</li>
      </ul>
    </Section>

    <Divider />

    <Section>
      <h2 className="project-header">Algorithms</h2>

      <table className="min-w-full">
        <tbody>
          {algorithms.map((row, i) => (
            <tr key={i}>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-divider text-sm leading-5">
                {row[0]}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-divider text-sm leading-5">
                {row[1]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Section>

    <Divider />

    <Screenshots images={images} />

    <Divider />

    <Pagination
      nextTitle="Delivery Route Planner"
      nextLink="/projects/delivery-route-planner"
    />
  </Layout>
);

export default SortingVisualiser;
