import React from 'react';

import { IProject } from '../../data';
import { getLongDate } from '../../utilities/date';
import { Chip } from '../Chip';
import { Link } from '../Link';
import { Section } from '../Section';

interface ProjectHeaderProps {
  project: IProject;
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({ project }) => {
  return (
    <Section>
      <h1 className="project-title">{project.title}</h1>
      {project.subtitle && (
        <h2 className="project-subtitle">{project.subtitle}</h2>
      )}
      <p className="text-link-hover my-4">
        <time dateTime={project.date.start}>
          {getLongDate(project.date.start)}
        </time>
        {project.date.end && (
          <>
            {' '}
            -{' '}
            <time dateTime={project.date.end}>
              {getLongDate(project.date.end)}
            </time>
          </>
        )}
      </p>
      <p className="mb-4 max-w-reading">{project.description}</p>

      {(project.github || project.liveLink) && (
        <ul className="project-list">
          {project.github && (
            <li className="mb-4">
              <span>Explore this project on </span>
              <Link href={project.github}>GitHub</Link>
            </li>
          )}
          {project.liveLink && (
            <li className="mb-4">
              <span>Explore this project live </span>
              <Link href={project.liveLink}>here</Link>
            </li>
          )}
        </ul>
      )}

      <div className="flex flex-row flex-wrap items-center mt-8 gap-4">
        {project.skills.active.map((skill) => (
          <Chip key={skill} name={skill} />
        ))}
        {project.skills.disabled &&
          project.skills.disabled.map((skill) => (
            <Chip disabled key={skill} name={skill} />
          ))}
      </div>
    </Section>
  );
};
