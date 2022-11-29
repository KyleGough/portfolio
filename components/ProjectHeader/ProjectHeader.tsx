import { Chip } from '@components/Chip';
import { Link } from '@components/Link';
import { Section } from '@components/Section';
import { getFormattedDate, getShortDate } from '@utilities/date';
import { Project } from '@utilities/types';
import React from 'react';

interface ProjectHeaderProps {
  project: Project;
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({ project }) => {
  return (
    <Section>
      <h1 className="project-title">{project.title}</h1>
      {project.subtitle && (
        <h2 className="project-subtitle">{project.subtitle}</h2>
      )}
      <p className="text-link-hover my-4">
        <time dateTime={getShortDate(project.date.start)}>
          {getFormattedDate(project.date.start)}
        </time>
        {project.date.end && (
          <>
            {' '}
            -{' '}
            <time dateTime={getShortDate(project.date.end)}>
              {getFormattedDate(project.date.end)}
            </time>
          </>
        )}
      </p>
      <p className="mb-4 max-w-reading">{project.description}</p>

      {(project.github || project.liveLink) && (
        <div className="block sm:flex gap-2">
          {project.github && (
            <Link
              className="w-fit block my-2 px-8 py-2 bg-background rounded-lg border-2 text-link hover:text-link-hover focus:text-hover-link"
              href={project.github}
            >
              Explore project on GitHub
            </Link>
          )}
          {project.liveLink && (
            <Link
              className="w-fit block my-2 px-8 py-2 bg-background rounded-lg border-2 text-link hover:text-link-hover focus:text-link-hover"
              href={project.liveLink}
            >
              Explore project live
            </Link>
          )}
        </div>
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
