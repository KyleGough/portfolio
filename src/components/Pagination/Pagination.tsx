import React from 'react';
import { Link } from 'react-router-dom';

import { ArrowBackIcon, ArrowForwardIcon } from '../../icons';
import { Section } from '../Section';

interface PaginationProps {
  previousTitle?: string;
  previousLink?: string;
  nextTitle?: string;
  nextLink?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  previousTitle,
  previousLink,
  nextTitle,
  nextLink,
}) => {
  const previousClassName = `flex items-center ${
    previousTitle
      ? 'fill-link text-link hover:fill-link-hover hover:text-link-hover'
      : 'fill-disabled text-disabled cursor-not-allowed'
  }`;
  const nextClassName = `flex items-center ${
    nextTitle
      ? 'fill-link text-link hover:fill-link-hover hover:text-link-hover'
      : 'fill-disabled text-disabled cursor-not-allowed'
  }`;

  return (
    <Section>
      <div className="flex justify-between">
        <Link to={previousLink || '#'} className={previousClassName}>
          <ArrowBackIcon className="w-6 h-6" />
          <div className="text-center ml-4">
            <p className="text-sm">Previous Project</p>
            <p>{previousTitle || '-'}</p>
          </div>
        </Link>
        <Link to={nextLink || '#'} className={nextClassName}>
          <div className="text-center mr-4">
            <p className="text-sm">Next Project</p>
            <p>{nextTitle || '-'}</p>
          </div>
          <ArrowForwardIcon className="w-6 h-6" />
        </Link>
      </div>
    </Section>
  );
};
