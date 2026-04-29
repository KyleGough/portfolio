import { ArrowForwardIcon } from '@components/Icons';
import { Section } from '@components/Section';
import { getDateRange, getProjectStartDateTime } from '@utilities/date';
import { ProjectDate } from '@utilities/types';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import React from 'react';

interface ProjectItemProps {
  alt: string;
  date: ProjectDate;
  description: string;
  image: StaticImageData;
  link: string;
  title: string;
}

export const ProjectItem: React.FC<ProjectItemProps> = ({
  title,
  date,
  description,
  link,
  image,
  alt,
}) => (
  <Section>
    <div className="project-item__row">
      <div className="project-item__text col-span-12 lg:col-span-7">
        <h2 className="project-header !mb-2 text-balance">{title}</h2>
        <time
          className="work-timeline__date mt-1 block"
          dateTime={getProjectStartDateTime(date)}
        >
          {getDateRange(date)}
        </time>
        <p className="project-item__desc mt-6">{description}</p>
      </div>
      <div className="col-span-12 flex justify-center lg:col-span-5 lg:-mb-8 lg:justify-end">
        <Link
          href={link}
          className="project-item-link group mx-auto block w-full max-w-md rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link-hover focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:max-w-none"
        >
          <div className="project-item-card overflow-hidden rounded-lg border-2 border-white shadow transition-shadow duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none">
            <div className="relative">
              <Image
                className="block h-auto w-full"
                src={image.src}
                alt={alt}
                width={image.width}
                height={image.height}
                placeholder="blur"
                blurDataURL={image.blurDataURL}
              />
            </div>
            <div className="project-item-cta relative flex items-center justify-center gap-2.5 border-t border-white/25 bg-background px-5 py-3.5 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-link transition-[color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none group-hover:text-link-hover group-focus-visible:text-link-hover">
              <span>View project</span>
              <span
                aria-hidden
                className="inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center opacity-55 transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-safe:group-hover:translate-x-1 motion-safe:group-focus-visible:translate-x-1 motion-safe:group-hover:opacity-100 motion-safe:group-focus-visible:opacity-100"
              >
                <ArrowForwardIcon className="h-full w-full fill-current" />
              </span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  </Section>
);
