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
          className="group mx-auto block w-full max-w-md lg:max-w-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link-hover focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg"
        >
          <div className="overflow-hidden rounded-lg border-2 border-white shadow">
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
            <div className="border-t border-white/25 bg-background px-4 py-3 text-sm font-semibold tracking-wide text-link transition-colors group-hover:text-link-hover group-focus-visible:text-link-hover">
              View Project
            </div>
          </div>
        </Link>
      </div>
    </div>
  </Section>
);
