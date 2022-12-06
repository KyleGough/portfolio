import { Chip } from '@components/Chip';
import { GitHubIcon, WebsiteIcon } from '@components/Icons';
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
              className="group w-fit flex items-center my-2 px-4 py-2 bg-background rounded-lg border-2 text-link hover:text-link-hover"
              href={project.github}
            >
              <GitHubIcon className="w-5 h-5 mr-2 fill-link group-hover:fill-link-hover" />
              GitHub
            </Link>
          )}
          {project.liveLink && (
            <Link
              className="group w-fit flex items-center my-2 px-4 py-2 bg-background rounded-lg border-2 text-link hover:text-link-hover"
              href={project.liveLink}
            >
              <WebsiteIcon className="w-5 h-5 mr-2 fill-link group-hover:fill-link-hover" />
              Website
            </Link>
          )}
        </div>
      )}

      <div className="flex flex-row flex-wrap items-center mt-8 gap-4">
        {project.skills.map((skill) => (
          <Chip key={skill} name={skill} />
        ))}
      </div>
    </Section>
  );
};
