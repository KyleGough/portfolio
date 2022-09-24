import React, { useEffect } from 'react';

import { Divider } from '../../../components/Divider';
import { ImageFigure } from '../../../components/ImageFigure';
import { Pagination } from '../../../components/Pagination';
import { ProjectHeader } from '../../../components/ProjectHeader';
import { Screenshots } from '../../../components/Screenshots';
import { Section } from '../../../components/Section';
import { getProjectData } from '../../../data';
import images from './images.json';

const project = getProjectData('delivery-route-planner');

export const DeliveryPlanner: React.FC = () => {
  useEffect(() => {
    document.title =
      'Delivery Route Planner - Delivery Route and Report Generation Software';
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
