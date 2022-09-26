import { clsx } from 'clsx';
import React from 'react';
import { Link } from 'react-router-dom';

import { useObserveElement } from '../../hooks/useObserveElement';
import { getLongDate } from '../../utilities/date';
import { ProjectChip } from '../ProjectChip';

interface ProjectCardProps {
  className?: string;
  src: string;
  alt: string;
  tagline: string;
  date: string;
  link: string;
  chipText: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  className,
  src,
  alt,
  tagline,
  date,
  link,
  chipText,
}) => {
  const [elementRef, isVisible] = useObserveElement<HTMLAnchorElement>({
    threshold: 0.5,
  });

  return (
    <Link
      ref={elementRef}
      to={link}
      className={clsx(
        className,
        { 'opacity-100': isVisible },
        { 'opacity-0': !isVisible },
        'group overflow-hidden',
        'duration-1000 transition-opacity ease-in-out',
        'rounded-2xl border-2 border-white',
        'shadow drop-shadow-lg'
      )}
    >
      <img className="w-full" src={src} alt={alt} />
      <div className="text-white p-4 font-bold group-hover:brightness-125 group-focus:brightness-125 bg-nav-light">
        <h3 className="text-xl font-medium mb-4 h-[3.5rem] line-clamp-2">
          {tagline}
        </h3>
        <div className="flex justify-between items-center">
          <p className="text-sm opacity-80">
            <time dateTime={date}>{getLongDate(date)}</time>
          </p>
          <ProjectChip name={chipText} />
        </div>
      </div>
    </Link>
  );
};
