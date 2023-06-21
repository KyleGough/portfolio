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
      <h2 className="project-header">Features</h2>
      <ul className="project-list">
        <li>User registration.</li>
        <li>User authentication.</li>
        <li>Create a group of existing users by email address.</li>
        <li>Create a bill for a group.</li>
        <li>Create a bill for any set of users.</li>
        <li>Mostly AJAX content to enchance user experience.</li>
        <li>Ability to settle a payment in one or multiple payments.</li>
        <li>Displays the status of bills.</li>
        <li>Notification system for new unseen bills.</li>
        <li>Email notifications for new groups and bills.</li>
        <li>Search functionality for bills and groups.</li>
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
