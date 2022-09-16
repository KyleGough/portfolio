import React from 'react';
import { Link } from 'react-router-dom';
import { ProjectChip } from '../ProjectChip';
import useObserveElement from '../../hooks/useObserveElement';

interface ProjectCardProps {
  className?: string;
  src: string;
  alt: string;
  title: string;
  tagline: string;
  shortDate: string;
  date: string;
  link: string;
  chipText: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  className,
  src,
  alt,
  title, // TODO
  tagline,
  shortDate,
  date,
  link,
  chipText,
}) => {
  const [elementRef, isVisible] = useObserveElement<HTMLAnchorElement>({
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
  });

  return (
    <Link
      ref={elementRef}
      to={link}
      className={`${className ? className : ''} ${
        // TODO
        isVisible ? 'opacity-100' : 'opacity-0'
      } duration-1000 transition-opacity ease-in-out rounded-2xl overflow-hidden border-2 border-white shadow drop-shadow-lg group`}
    >
      <img className="w-full" src={src} alt={alt} />
      <div className="text-white p-4 font-bold group-hover:brightness-125 group-focus:brightness-125 bg-nav-light">
        <h3 className="text-xl font-medium mb-4 h-[3.5rem] line-clamp-2">
          {tagline}
        </h3>
        <div className="flex justify-between items-center">
          <p className="text-sm opacity-80">
            <time dateTime={shortDate}>{date}</time>
          </p>
          <ProjectChip name={chipText} />
        </div>
      </div>
    </Link>
  );
};
