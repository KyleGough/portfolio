import React from 'react';
import { Link } from 'react-router-dom';

import { IProjectDate } from '../../data';
import { getDateRange } from '../../utilities/date';
import { Section } from '../Section';

interface ProjectItemProps {
  title: string;
  date: IProjectDate;
  description: string;
  link: string;
  src: string;
  alt: string;
  logo: string;
}

export const ProjectItem: React.FC<ProjectItemProps> = ({
  title,
  date,
  description,
  link,
  src,
  alt,
  logo,
}) => (
  <Section>
    <div className="grid grid-cols-12 gap-8 lg:gap-16">
      <div className="col-span-12 lg:col-span-7">
        <h2 className="mb-4 project-header">{title}</h2>
        <p className="my-4 text-link-hover">{getDateRange(date)}</p>
        <p className="my-4">{description}</p>
      </div>
      <div className="col-span-12 lg:col-span-5 text-center -mb-8">
        <Link className="block group relative" to={link}>
          <img
            loading="lazy"
            className="border-2 border-white rounded-lg shadow"
            src={src}
            alt={alt}
          />
          <img className="absolute top-2 right-2 w-8 h-8 drop-shadow" src={logo} />
          <button
            tabIndex={-1}
            className="relative -top-[1.6rem] px-12 py-3 bg-background text-link group-hover:text-link-hover group-focus:text-link-hover rounded-sm shadow border-light whitespace-nowrap"
          >
            View Project
          </button>
        </Link>
      </div>
    </div>
  </Section>
);
