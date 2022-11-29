import { FadeIn } from '@components/FadeIn';
import { ProjectChip } from '@components/ProjectChip';
import { getFormattedDate, getShortDate } from '@utilities/date';
import { Date } from '@utilities/types';
import { clsx } from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface ProjectCardProps {
  className?: string;
  src: string;
  alt: string;
  date: Date;
  link: string;
  chipText: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  className,
  src,
  alt,
  date,
  link,
  chipText,
}) => {
  return (
    <Link href={link}>
      <div
        className={clsx(
          'group overflow-hidden',
          'rounded-2xl border-2 border-white',
          'shadow drop-shadow-lg cursor-pointer'
        )}
      >
        <FadeIn className={className}>
          <div className="w-full">
            <Image src={src} alt={alt} width={640} height={360} />
          </div>
          <div className="text-white p-4 font-bold group-hover:brightness-125 group-focus:brightness-125 bg-nav-light">
            <div className="flex justify-between items-center">
              <p className="text-sm opacity-80">
                <time dateTime={getShortDate(date)}>
                  {getFormattedDate(date)}
                </time>
              </p>
              <ProjectChip name={chipText} />
            </div>
          </div>
        </FadeIn>
      </div>
    </Link>
  );
};
