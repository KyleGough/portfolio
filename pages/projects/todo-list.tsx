import { Divider } from '@components/Divider';
import { ImageFigure } from '@components/ImageFigure';
import { Layout } from '@components/Layout';
import { Pagination } from '@components/Pagination';
import { ProjectHeader } from '@components/ProjectHeader';
import { Screenshots } from '@components/Screenshots';
import { Section } from '@components/Section';
import imageHomepage from '@image/todo-list1.jpg';
import imageShopping from '@image/todo-list2.jpg';
import imageRegistration from '@image/todo-list3.jpg';
import imageLists from '@image/todo-list4.jpg';
import imageLogin from '@image/todo-list5.jpg';
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
      <h2 className="project-header">Project Highlights</h2>
      <ul className="project-list max-w-reading">
        <li>
          <strong>User Registration:</strong> Seamlessly sign up and create a
          personalised account.
        </li>
        <li>
          <strong>List Management:</strong> Dive deep into your tasks with the
          ability to mark them as complete, helping you stay organised and
          productive.
        </li>
        <li>
          <strong>Add New Tasks:</strong> Quickly and intuitively add new tasks
          to your lists, making it easy to capture your todos as they come to
          mind.
        </li>
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

export const getStaticProps: GetStaticProps = () => {
  const images = [
    { imageData: imageHomepage, alt: 'Homepage' },
    { imageData: imageShopping, alt: 'Shopping list' },
    { imageData: imageRegistration, alt: 'New user registration' },
    { imageData: imageLists, alt: "User's lists" },
    { imageData: imageLogin, alt: 'Existing login page' },
  ];

  return {
    props: {
      images: images,
      project: getProjectData('todo-list'),
    },
  };
};

export default ToDoList;
