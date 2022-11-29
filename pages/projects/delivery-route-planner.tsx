import { Divider } from '@components/Divider';
import { ImageFigure } from '@components/ImageFigure';
import { Layout } from '@components/Layout';
import { Pagination } from '@components/Pagination';
import { ProjectHeader } from '@components/ProjectHeader';
import { Screenshots } from '@components/Screenshots';
import { Section } from '@components/Section';
import imageDeliveryView from '@image/delivery-route-planner1.jpg';
import imageRouteView from '@image/delivery-route-planner2.jpg';
import imageReport from '@image/delivery-route-planner3.jpg';
import imageRoute from '@image/delivery-route-planner4.jpg';
import { getProjectData } from '@utilities/Project';
import { ProjectPageProps } from '@utilities/types';
import { GetStaticProps } from 'next';
import React from 'react';

const DeliveryPlanner: React.FC<ProjectPageProps> = ({ images, project }) => (
  <Layout title="Delivery Route Planner - Delivery Route and Report Generation Software">
    <ProjectHeader project={project} />

    <Divider />

    <ImageFigure image={images[0]} />

    <Divider />

    <Section>
      <h2 className="project-header">Features</h2>
      <ul className="project-list">
        <li>Creates an efficient route for a number of selected deliveries.</li>
        <li>Utilises database to store client, delivery, and product data.</li>
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
  </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
  const images = [
    { imageData: imageDeliveryView, alt: 'Delivery view' },
    { imageData: imageRouteView, alt: 'Route view' },
    { imageData: imageReport, alt: 'Generated report' },
    { imageData: imageRoute, alt: 'Generated route' },
  ];

  return {
    props: {
      images: images,
      project: getProjectData('delivery-route-planner'),
    },
  };
};

export default DeliveryPlanner;
