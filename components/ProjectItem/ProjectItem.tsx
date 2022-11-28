import { Section } from '@components/Section';
import { getDateRange } from '@utilities/date';
import { ProjectDate } from '@utilities/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface ProjectItemProps {
  title: string;
  date: ProjectDate;
  description: string;
  link: string;
  src: string;
  alt: string;
  logo: {
    src: string;
    alt: string;
  };
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
        <Link href={link}>
          <div className="block group relative">
            <img
              loading="lazy"
              className="border-2 border-white rounded-lg shadow"
              src={src}
              alt={alt}
            />
            <div className="absolute top-2 right-2 w-8 h-8 drop-shadow">
              <Image src={logo.src} alt={logo.alt} layout="fill" />
            </div>
            <button
              tabIndex={-1}
              className="relative -top-[1.6rem] px-12 py-3 bg-background text-link group-hover:text-link-hover group-focus:text-link-hover rounded-sm shadow border-light whitespace-nowrap"
            >
              View Project
            </button>
          </div>
        </Link>
      </div>
    </div>
  </Section>
);
