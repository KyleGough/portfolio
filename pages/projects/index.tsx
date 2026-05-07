import { Divider } from '@components/Divider';
import { Layout } from '@components/Layout';
import { ProjectItem } from '@components/ProjectItem';
import { ProjectsFilterPanel } from '@components/ProjectsFilterPanel';
import { Section } from '@components/Section';
import extruded from '@components/SpaceExtrudedTitle/extrudedTitle.module.css';
import { projects } from '@utilities/Project';
import { Project } from '@utilities/types';
import React, { useState } from 'react';

const Projects: React.FC = () => {
  const [filter, setFilter] = useState('All');

  const filterProjects = (project: Project): boolean => {
    return filter === 'All' ? true : project.filters.includes(filter);
  };

  const filteredProjects = projects.filter((project) => filterProjects(project));

  return (
    <Layout title="Project List - Kyle Gough">
      <Section>
        <h1 className="projects-list-page-title mb-8 mt-12 text-center md:text-left">
          <span className={extruded.nameExtruded}>Projects</span>
        </h1>
      </Section>

      <ProjectsFilterPanel filter={filter} setFilter={setFilter} />

      {filteredProjects.map((project, i) => {
          return (
            <React.Fragment key={project.title}>
              {i !== 0 && <Divider />}
              <ProjectItem
                title={project.title}
                date={project.date}
                description={project.description}
                image={project.image}
                alt={project.alt}
                link={project.link}
                isLast={i === filteredProjects.length - 1}
              />
            </React.Fragment>
          );
        })}
    </Layout>
  );
};

export default Projects;
