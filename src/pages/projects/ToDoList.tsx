import React, { useEffect } from 'react';
import { Section } from '../../components/Section';
import { Divider } from '../../components/Divider';
import { Chip } from '../../components/Chip';
import { Pagination } from '../../components/Pagination';
import { ImageFigure } from '../../components/ImageFigure';
import { Screenshots } from '../../components/Screenshots';

export default function ToDoList() {
  useEffect(() => {
    document.title = 'To Do List - Web Application to Manage To Do Lists';
  }, []);

  const images = [
    { src: '/img/todo-list1.jpg', caption: 'Homepage' },
    { src: '/img/todo-list2.jpg', caption: 'Shopping list' },
    { src: '/img/todo-list3.jpg', caption: 'New user registration' },
    // TODO
    // eslint-disable-next-line quotes
    { src: '/img/todo-list4.jpg', caption: "User's lists" },
    { src: '/img/todo-list5.jpg', caption: 'Existing login page' },
  ];

  return (
    <>
      <Section>
        <h1 className="project-title">To Do List</h1>
        <h2 className="project-subtitle">
          Web Development Technologies Lab Work
        </h2>
        <p className="text-link-hover my-4">
          <time dateTime="2017-01">January 2017</time> -{' '}
          <time dateTime="2017-02">February 2017</time>
        </p>
        <p className="mb-4 max-w-reading">
          To Do List Web application where users can signup and create their own
          lists. Learned and integrated PHP and SQL to store and query
          user&apos;s lists. Protected the application from SQL injection and
          Cross-Site scripting.
        </p>

        <div className="flex flex-row flex-wrap items-center mt-8 gap-4">
          <Chip name="PHP" />
          <Chip name="JavaScript" />
          <Chip name="jQuery" />
          <Chip name="SQL" />
          <Chip name="HTML" />
          <Chip name="CSS" />
        </div>
      </Section>

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
}
