import { Section } from '@components/Section';
import { getDateRange } from '@utilities/date';
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
  logo: {
    alt: string;
    src: string;
  };
  title: string;
}

export const ProjectItem: React.FC<ProjectItemProps> = ({
  title,
  date,
  description,
  link,
  image,
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
              <div className="absolute right-2 top-2 h-8 w-8 drop-shadow">
                <Image src={logo.src} alt={logo.alt} width={30} height={30} />
              </div>
            </div>
            <div className="project-item-cta relative flex items-center justify-center gap-2.5 border-t border-white/25 bg-background px-5 py-3.5 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-link transition-[color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none group-hover:text-link-hover group-focus-visible:text-link-hover">
              <span>View project</span>
              <svg
                aria-hidden
                className="h-3.5 w-3.5 shrink-0 opacity-55 transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-safe:group-hover:translate-x-1 motion-safe:group-focus-visible:translate-x-1 motion-safe:group-hover:opacity-100 motion-safe:group-focus-visible:opacity-100"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.25}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </Link>
      </div>
    </div>
  </Section>
);
