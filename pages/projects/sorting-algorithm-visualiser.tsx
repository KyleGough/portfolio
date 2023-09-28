import { Divider } from '@components/Divider';
import { Layout } from '@components/Layout';
import { Pagination } from '@components/Pagination';
import { ProjectHeader } from '@components/ProjectHeader';
import { Screenshots } from '@components/Screenshots';
import { Section } from '@components/Section';
import { VideoFigure } from '@components/VideoFigure';
import imageUnsorted from '@image/sorting-algorithm-visualiser1.jpg';
import imageRandom from '@image/sorting-algorithm-visualiser2.jpg';
import imageBitonic from '@image/sorting-algorithm-visualiser3.jpg';
import imagePoints from '@image/sorting-algorithm-visualiser4.jpg';
import imageInfo from '@image/sorting-algorithm-visualiser5.jpg';
import algorithms from '@utilities/algorithms.json';
import { getProjectData } from '@utilities/Project';
import { ProjectPageProps } from '@utilities/types';
import { GetStaticProps } from 'next';
import React from 'react';

const SortingVisualiser: React.FC<ProjectPageProps> = ({ images, project }) => (
  <Layout title="Sorting Algorithm Visualiser - Visualise 20 Unique Sorting Algorithms">
    <ProjectHeader project={project} />

    <Divider />

    <VideoFigure src="/video/heap-sort.mp4" caption="Heap Sort" />

    <Divider />

    <Section>
      <h2 className="project-header">Project Highlights</h2>
      <ul className="project-list max-w-reading">
        <li>
          <strong>Real-time Visualisation:</strong> Immerse yourself in the
          sorting process with a real-time visualiser that can be paused and
          stopped at your command. Gain a profound understanding of how
          algorithms work under the hood.
        </li>
        <li>
          <strong>Algorithmic Arsenal:</strong> Choose from a diverse lineup of
          20 distinct sorting algorithms, each with its own unique
          characteristics. Explore classics like Bubble Sort, Merge Sort, and
          Quicksort, and discover their Big-O complexities, stability, and
          in-place capabilities.
        </li>
        <li>
          <strong>Customisation Unleashed:</strong> Tailor your sorting
          experiments with precision. Select from 18 starting datasets, tweak
          dataset size, range, and delay, and choose custom colours and data
          display styles to match your preferences.
        </li>
        <li>
          <strong>Insightful Statistics:</strong> Dive deep into the performance
          metrics of each algorithm, with detailed statistics including
          comparisons, swaps, and duration provided. Grasp the true efficiency
          of each sorting strategy.
        </li>
      </ul>
    </Section>

    <Divider />

    <Section>
      <h2 className="project-header">Algorithms</h2>

      <table className="min-w-full">
        <tbody>
          {algorithms.map((row, i) => (
            <tr key={i}>
              <td className="px-6 py-4 text-sm leading-5 border-b whitespace-no-wrap border-divider">
                {row[0]}
              </td>
              <td className="px-6 py-4 text-sm leading-5 border-b whitespace-no-wrap border-divider">
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

export const getStaticProps: GetStaticProps = () => {
  const images = [
    {
      imageData: imageUnsorted,
      alt: 'Unsorted Random Data',
    },
    {
      imageData: imageRandom,
      alt: 'Random and sinusoidal datasets',
    },
    {
      imageData: imageBitonic,
      alt: 'Bitonic sort and sorted dataset',
    },
    {
      imageData: imagePoints,
      alt: 'Dataset visualised as points',
    },
    {
      imageData: imageInfo,
      alt: 'Algorithm information table',
    },
  ];

  return {
    props: {
      images: images,
      project: getProjectData('sorting-algorithm-visualiser'),
    },
  };
};

export default SortingVisualiser;
