import { Divider } from '@components/Divider';
import { ImageFigure } from '@components/ImageFigure';
import { Layout } from '@components/Layout';
import { Pagination } from '@components/Pagination';
import { ProjectHeader } from '@components/ProjectHeader';
import { Screenshots } from '@components/Screenshots';
import { Section } from '@components/Section';
import { getProjectData } from '@utilities/Project';
import { ProjectPageProps } from '@utilities/types';
import { GetStaticProps } from 'next';
import React from 'react';

const ToDoList: React.FC<ProjectPageProps> = ({ images, project }) => (
  <Layout title="To Do List - Web Application to Manage To Do Lists">
    <ProjectHeader project={project} />

    <Divider />

    <ImageFigure image={images[0]} />

    <Divider />

    <Section>
      <h2 className="project-header">Features</h2>
      <ul className="project-list">
        <li>User registration.</li>
        <li>View selection of lists.</li>
        <li>View items in a list.</li>
        <li>Mark items in a list as complete.</li>
        <li>Create a new list.</li>
        <li>Add new item to a list.</li>
      </ul>
    </Section>

    <Divider />

    <Screenshots images={images} />

    <Divider />

    <Pagination
      previousTitle="Delivery Route Planner"
      previousLink="/projects/delivery-route-planner"
      nextTitle="BSplit"
      nextLink="/projects/bsplit"
    />
  </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
  const images = [
    { src: '/img/todo-list1.jpg', alt: 'Homepage' },
    { src: '/img/todo-list2.jpg', alt: 'Shopping list' },
    { src: '/img/todo-list3.jpg', alt: 'New user registration' },
    { src: '/img/todo-list4.jpg', alt: "User's lists" },
    { src: '/img/todo-list5.jpg', alt: 'Existing login page' },
  ];

  return {
    props: {
      images: images,
      project: getProjectData('todo-list'),
    },
  };
};

export default ToDoList;
