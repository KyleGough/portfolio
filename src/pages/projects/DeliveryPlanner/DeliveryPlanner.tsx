import React, { useEffect } from 'react';
import { Section } from '../../../components/Section';
import { Divider } from '../../../components/Divider';
import { Chip } from '../../../components/Chip';
import { Pagination } from '../../../components/Pagination';
import { ImageFigure } from '../../../components/ImageFigure';
import { Screenshots } from '../../../components/Screenshots';
import images from './images.json';

export const DeliveryPlanner: React.FC = () => {
  useEffect(() => {
    document.title =
      'Delivery Route Planner - Delivery Route and Report Generation Software';
  }, []);

  return (
    <>
      <Section>
        <h1 className="project-title">Delivery Route Planner</h1>
        <h2 className="project-subtitle">A-Level Computing Coursework</h2>
        <p className="text-link-hover my-4">
          <time dateTime="2015-12">December 2015</time> -{' '}
          <time dateTime="2016-03">March 2016</time>
        </p>
        <p className="mb-4 max-w-reading">
          Software written in C# which creates an efficient route between
          multiple delivery locations. Uses SQL to store and query data on
          products, clients and their deliveries. Produces a report which
          communicates the route, all items in the deliveries, and the estimated
          time taken. Uses graph algorithms such as Dijkstra&apos;s and Nearest
          Neighbour with 2-Opt to optimise the route.
        </p>

        <div className="flex flex-row flex-wrap items-center mt-8 gap-4">
          <Chip name="C#" />
          <Chip name="SQL" />
        </div>
      </Section>

      <Divider />

      <ImageFigure image={images[0]} />

      <Divider />

      <Section>
        <h2 className="project-header">Features</h2>
        <ul className="project-list">
          <li>
            Creates an efficient route for a number of selected deliveries.
          </li>
          <li>
            Utilises database to store client, delivery, and product data.
          </li>
          <li>
            Ability to view/add/edit/delete client, delivery and product data.
          </li>
          <li>
            Creates a printable report including delivery order, total items and
            estimated time.
          </li>
        </ul>
      </Section>

      <Divider />

      <Screenshots images={images} />

      <Divider />

      <Pagination
        previousTitle="Sorting Algorithm Visualiser"
        previousLink="/projects/sorting-algorithm-visualiser"
        nextTitle="To Do List"
        nextLink="/projects/todo-list"
      />
    </>
  );
};