import React, { useEffect } from 'react';
import { Section } from '../../../components/Section';
import { Divider } from '../../../components/Divider';
import { Chip } from '../../../components/Chip';
import { Pagination } from '../../../components/Pagination';
import { VideoFigure } from '../../../components/VideoFigure';
import { Screenshots } from '../../../components/Screenshots';
import HeapSortVideo from '../../../videos/heap.mp4';
import images from './images.json';
import algorithms from './algorithms.json';

export const SortingVisualiser: React.FC = () => {
  useEffect(() => {
    document.title =
      'Sorting Algorithm Visualiser - Visualise 20 Unique Sorting Algorithms';
  }, []);

  return (
    <>
      <Section>
        <h1 className="project-title">Sorting Algorithm Visualiser</h1>
        <p className="text-link-hover my-4">
          <time dateTime="2015-09">September 2015</time> -{' '}
          <time dateTime="2015-11">November 2015</time>
        </p>
        <p className="mb-4 max-w-reading">
          Tool for visualising the sorting process on a generated dataset.
          Highlights swapping and sorted elements in real-time. Supports 20
          different sorting algorithms including: Bubble, Mergesort and
          Quicksort. The visualiser is fully customisable with options to change
          the dataset size, range of values in the dataset and delay between
          each operation. The tool also has the ability to compare and visualise
          two sorting algorithms concurrently. The initial dataset can be one of
          18 configurations such as: random, normally distributed or sawtooth.
        </p>

        <div className="flex flex-row flex-wrap items-center mt-8 gap-4">
          <Chip name="C#" />
        </div>
      </Section>

      <Divider />

      <VideoFigure src={HeapSortVideo} caption="Heap Sort" />

      <Divider />

      <Section>
        <h2 className="project-header">Overview</h2>
        <p className="my-4 max-w-reading">
          Prior to this project, I had developed a simple CLI sorting algorithm
          visualiser in VB.net featuring a limited selection of algorithms and
          options. Once I had familiarised myself with C#, I decided to upgrade
          and rewrite the visualiser with a GUI, additional algorithms and
          enhanced customisation. The project served as a great tool for
          improving my C# and GUI design skills as well as futhering my
          understanding of how sorting algorithms operate, scale and perform.
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
    </>
  );
};
