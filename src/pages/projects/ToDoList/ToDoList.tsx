import React, { useEffect } from 'react';

import { Divider } from '../../../components/Divider';
import { ImageFigure } from '../../../components/ImageFigure';
import { Pagination } from '../../../components/Pagination';
import { ProjectHeader } from '../../../components/ProjectHeader';
import { Screenshots } from '../../../components/Screenshots';
import { Section } from '../../../components/Section';
import { getProjectData } from '../../../data';
import images from './images.json';

const project = getProjectData('todo-list');

export const ToDoList: React.FC = () => {
  useEffect(() => {
    document.title = 'To Do List - Web Application to Manage To Do Lists';
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
    </>
  );
};
