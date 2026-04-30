import { Chip } from "@components/Chip";
import { GitHubIcon, StarIcon, WebsiteIcon } from "@components/Icons";
import { Link } from "@components/Link";
import { Section } from "@components/Section";
import { getFormattedDate, getShortDate } from "@utilities/date";
import { Project } from "@utilities/types";
import React from "react";

const githubStargazersUrl = (repoUrl: string): string => {
  return repoUrl.replace(/\/$/, "") + "/stargazers";
};

interface ProjectHeaderProps {
  githubStargazerCount?: number | null;
  project: Project;
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  project,
  githubStargazerCount,
}) => {
  return (
    <Section>
      <h1 className="project-title">{project.title}</h1>
      {project.subtitle && (
        <h2 className="project-subtitle">{project.subtitle}</h2>
      )}
      <p className="my-3 font-primary text-sm font-medium tabular-nums tracking-wide text-link-hover">
        <time dateTime={getShortDate(project.date.start)}>
          {getFormattedDate(project.date.start)}
        </time>
        {project.date.end && (
          <>
            {" "}
            –{" "}
            <time dateTime={getShortDate(project.date.end)}>
              {getFormattedDate(project.date.end)}
            </time>
          </>
        )}
      </p>
      <p className="mb-4 max-w-reading font-primary text-base leading-relaxed text-primary">
        {project.description}
      </p>

      {(project.github || project.liveLink) && (
        <div className="flex flex-col items-start gap-1 sm:flex-row sm:flex-wrap sm:gap-3">
          {project.github && (
            <>
              {typeof githubStargazerCount === "number" ? (
                <div className="project-header-cta-pair w-fit self-start sm:self-auto">
                  <Link
                    className="project-header-cta project-header-cta--firstOfPair group w-fit"
                    href={project.github}
                  >
                    <GitHubIcon className="project-header-cta__icon" />
                    GitHub
                  </Link>
                  <Link
                    className="project-header-cta project-header-cta--secondOfPair group w-fit"
                    href={githubStargazersUrl(project.github)}
                  >
                    <StarIcon className="project-header-cta__icon" />
                    {githubStargazerCount.toLocaleString("en-GB")}
                  </Link>
                </div>
              ) : (
                <Link
                  className="project-header-cta group w-fit"
                  href={project.github}
                >
                  <GitHubIcon className="project-header-cta__icon" />
                  GitHub
                </Link>
              )}
            </>
          )}
          {project.liveLink && (
            <Link
              className="project-header-cta group w-fit"
              href={project.liveLink}
            >
              <WebsiteIcon className="project-header-cta__icon" />
              Website
            </Link>
          )}
        </div>
      )}

      <div className="mt-8 flex flex-row flex-wrap items-center gap-4">
        {project.skills.map((skill) => (
          <Chip key={skill}>{skill}</Chip>
        ))}
      </div>
    </Section>
  );
};
