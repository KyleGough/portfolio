import React, { useEffect, useState } from 'react';
import { Section } from '../../components/Section';
import { ProjectFilter } from '../../components/ProjectFilter';
import { ProjectItem } from '../../components/ProjectItem';
import { Divider } from '../../components/Divider';
import projects from './projects.json';

interface IProject {
  title: string;
  date: string;
  video?: string;
  src: string;
  alt: string;
  link: string;
  filters: string[];
  description: string;
}

export const Projects: React.FC = () => {
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    document.title = 'Project List - Kyle Gough';
  }, []);

  const filterProjects = (project: IProject): boolean => {
    return filter === 'All' ? true : project.filters.includes(filter);
  };

  return (
    <>
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
              />
            </React.Fragment>
          );
        })}
    </>
  );
};