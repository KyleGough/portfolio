import { clsx } from 'clsx';
import React from 'react';

interface ProgressNodeProps {
  title: string;
  company: string;
  date: string;
  align: 'left' | 'right';
  logo?: string;
}

export const ProgressNode: React.FC<ProgressNodeProps> = ({
  title,
  company,
  date,
  align,
  logo
}) => {
  return (
    <>
      {align === 'right' && <div className='hidden md:block'></div>}
      <div className={clsx(
        'flex items-center justify-end h-48',
        { 'md:flex-row-reverse': align === 'right' }
      )}>
        <img className={clsx(
          'w-16 md:w-24 lg:w-32 mr-8',
          { 'md:ml-8 md:mr-0': align === 'right' }
        )}
        src={logo}
        alt={company}
        />
        <div className={clsx(
          'mr-8',
          { 'md:ml-8 md:mr-0 md:text-right': align === 'right' }
        )}>
          <p className="text-3xl">{company}</p>
          <p className="text-xl">{title}</p>
          <p>{date}</p>
        </div>
        <div className="h-px border border-timeline w-6 max-w-[12rem] grow"></div>
      </div>
      {align === 'left' && <div className='hidden md:block'></div>}
    </>
  );
};
