import { Divider } from '@components/Divider';
import { ImageFigure } from '@components/ImageFigure';
import { Layout } from '@components/Layout';
import { Pagination } from '@components/Pagination';
import { ProjectHeader } from '@components/ProjectHeader';
import { Screenshots } from '@components/Screenshots';
import { Section } from '@components/Section';
import imageBillList from '@image/bsplit1.jpg';
import imageHompage from '@image/bsplit2.jpg';
import imageNewBill from '@image/bsplit3.jpg';
import imageGroupList from '@image/bsplit4.jpg';
import imageNewGroup from '@image/bsplit5.jpg';
import { getProjectData } from '@utilities/Project';
import { ProjectPageProps } from '@utilities/types';
import { GetStaticProps } from 'next';
import React from 'react';

const BSplit: React.FC<ProjectPageProps> = ({ images, project }) => (
  <Layout title="BSplit: Bill Splitter Web Application">
    <ProjectHeader project={project} />

    <Divider />

    <ImageFigure image={images[0]} />

    <Divider />

    <Section>
      <h2 className="project-header">Project Highlights</h2>
      <ul className="project-list max-w-reading">
        <li>
          <strong>Effortless Registration:</strong> Get started quickly by
          registering as a user, unlocking the power of collaborative bill
          management.
        </li>
        <li>
          <strong>Group Creation:</strong> Seamlessly bring friends and
          housemates together by creating groups using their email addresses.
        </li>
        <li>
          <strong>Bills Made Simple:</strong> Create bills effortlessly, whether
          for a specific group or any set of users, ensuring everyone&apos;s
          contributions are accurately tracked.
        </li>
        <li>
          <strong>Enhanced User Experience:</strong> Enjoy a smooth and
          uninterrupted experience with our AJAX-powered dashboard, preventing
          unnecessary page reloading and streamlining your interaction with the
          app.
        </li>
        <li>
          <strong>Flexible Payment Settlement:</strong> Settle payments at your
          convenience, whether in a single payment or multiple installments,
          making it easy to manage shared expenses.
        </li>
        <li>
          <strong>Notification System:</strong> Stay informed with our
          notification system, alerting you to unseen bills and providing email
          notifications for new groups and bills.
        </li>
        <li>
          <strong>Effortless Search:</strong> Quickly find the bills and groups
          you need with our intuitive search functionality.
        </li>
      </ul>
    </Section>

    <Divider />

    <Screenshots images={images} />

    <Divider />

    <Pagination
      previousTitle="To Do List"
      previousLink="/projects/todo-list"
      nextTitle="Cavern Minesweeper"
      nextLink="/projects/cavern-minesweeper"
    />
  </Layout>
);

export const getStaticProps: GetStaticProps = () => {
  const images = [
    { imageData: imageBillList, alt: 'Bill list' },
    { imageData: imageHompage, alt: 'Homepage' },
    { imageData: imageNewBill, alt: 'New bill form' },
    { imageData: imageGroupList, alt: 'Group list' },
    { imageData: imageNewGroup, alt: 'New group form' },
  ];

  return {
    props: {
      images: images,
      project: getProjectData('bsplit'),
    },
  };
};

export default BSplit;
