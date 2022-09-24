import React, { useEffect } from 'react';

import { Divider } from '../../../components/Divider';
import { ImageFigure } from '../../../components/ImageFigure';
import { Pagination } from '../../../components/Pagination';
import { ProjectHeader } from '../../../components/ProjectHeader';
import { Screenshots } from '../../../components/Screenshots';
import { Section } from '../../../components/Section';
import { getProjectData } from '../../../data';
import images from './images.json';

const project = getProjectData('bsplit');

export const BSplit: React.FC = () => {
  useEffect(() => {
    document.title = 'BSplit: Bill Splitter Web Application';
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
    </>
  );
};
