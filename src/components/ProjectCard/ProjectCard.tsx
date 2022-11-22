import { clsx } from 'clsx';
import React from 'react';
import { Link } from 'react-router-dom';

import { getLongDate } from '../../utilities/date';
import { FadeIn } from '../FadeIn';
import { ProjectChip } from '../ProjectChip';

interface ProjectCardProps {
  className?: string;
  src: string;
  alt: string;
  date: string;
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
    <Link
      to={link}
      className={clsx(
        'group overflow-hidden',
        'rounded-2xl border-2 border-white',
        'shadow drop-shadow-lg'
      )}
    >
      <FadeIn className={className}>
        <img className="w-full" src={src} alt={alt} />
        <div className="text-white p-4 font-bold group-hover:brightness-125 group-focus:brightness-125 bg-nav-light">
          <div className="flex justify-between items-center">
            <p className="text-sm opacity-80">
              <time dateTime={date}>{getLongDate(date)}</time>
            </p>
            <ProjectChip name={chipText} />
          </div>
        </div>
      </FadeIn>
    </Link>
  );
};
