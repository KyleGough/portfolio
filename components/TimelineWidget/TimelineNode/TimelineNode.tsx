import { FadeIn } from '@components/FadeIn';
import { clsx } from 'clsx';
import Image from 'next/image';
import React from 'react';

interface TimelineNodeProps {
  title: string;
  subtitle: string;
  date: string;
  align: 'left' | 'right';
  logo: {
    src: string;
    width: number;
    height: number;
  };
}

export const TimelineNode: React.FC<TimelineNodeProps> = ({
  title,
  subtitle,
  date,
  align,
  logo,
}) => {
  return (
    <>
      {align === 'right' && <div className="hidden md:block"></div>}
      <div
        className={clsx('flex items-center justify-end h-48', {
          'md:flex-row-reverse': align === 'right',
        })}
      >
        <FadeIn>
          <div
            className={clsx('relative w-16 md:w-24 lg:w-32 mr-8', {
              'md:ml-8 md:mr-0': align === 'right',
            })}
          >
            <Image
              src={logo.src}
              alt={title}
              width={logo.width}
              height={logo.height}
            />
          </div>
        </FadeIn>
        <FadeIn
          className={clsx('mr-8', {
            'md:ml-8 md:mr-0 md:text-right': align === 'right',
          })}
        >
          <p className="text-3xl">{title}</p>
          <p className="text-xl">{subtitle}</p>
          <p>{date}</p>
        </FadeIn>
        <div className="h-[2px] bg-timeline w-6 max-w-[12rem] grow"></div>
      </div>
      {align === 'left' && <div className="hidden md:block"></div>}
    </>
  );
};
