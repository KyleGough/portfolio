import React, { useState } from 'react';

import { Divider } from '../../components/Divider';
import { Layout } from '../../components/Layout';
import { ProjectFilter } from '../../components/ProjectFilter';
import { ProjectItem } from '../../components/ProjectItem';
import { Section } from '../../components/Section';
import { projects } from '../../utilities/Project';
import { Project } from '../../utilities/types';

const Projects: React.FC = () => {
  const [filter, setFilter] = useState('All');

  const filterProjects = (project: Project): boolean => {
    return filter === 'All' ? true : project.filters.includes(filter);
  };

  return (
    <Layout title="Project List - Kyle Gough">
      <Section>
        <h1 className="project-title mb-8 text-center md:text-left">
          Projects
        </h1>
      </Section>

      <hr className="mt-8 h-px bg-divider" />

      <div className="bg-circuits">
        <Section overrideTopPadding={true}>
          <ProjectFilter filter={filter} setFilterCallback={setFilter} />
        </Section>
        <hr className="mb-8 h-px bg-divider" />
      </div>

      {projects
        .filter((project) => filterProjects(project))
        .map((project, i) => {
          return (
            <React.Fragment key={project.title}>
              {i !== 0 && <Divider />}
              <ProjectItem
                title={project.title}
                date={project.date}
                description={project.description}
                src={project.src}
                alt={project.alt}
                link={project.link}
                logo={project.logo}
              />
            </React.Fragment>
          );
        })}
    </Layout>
  );
};

export default Projects;
