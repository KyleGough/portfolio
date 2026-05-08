import { FadeIn } from '@components/FadeIn';
import { clsx } from 'clsx';
import Image, { StaticImageData } from 'next/image';
import React from 'react';

interface TimelineNodeProps {
  align: 'left' | 'right';
  date: string;
  hoverLogo?: StaticImageData;
  logo: StaticImageData;
  subtitle: string;
  title: string;
}

export const TimelineNode: React.FC<TimelineNodeProps> = ({
  title,
  subtitle,
  date,
  align,
  logo,
  hoverLogo,
}) => {
  return (
    <>
      {align === 'right' && <div className="hidden md:block"></div>}
      <div
        className={clsx('flex items-center justify-end h-36 md:h-40', {
          'md:flex-row-reverse': align === 'right',
        })}
      >
        <FadeIn>
          <div
            className={clsx(
              'group/logo relative w-16 md:w-24 lg:w-32 mr-8',
              {
                'md:ml-8 md:mr-0': align === 'right',
              },
            )}
          >
            <Image
              src={logo.src}
              alt={title}
              width={logo.width}
              height={logo.height}
              placeholder="blur"
              blurDataURL={logo.blurDataURL}
              className={clsx(
                'transition-opacity duration-500 ease-in-out',
                hoverLogo ? 'opacity-100 group-hover/logo:opacity-0' : undefined,
              )}
            />
            {hoverLogo && (
              <Image
                src={hoverLogo.src}
                alt={title}
                width={hoverLogo.width}
                height={hoverLogo.height}
                placeholder="blur"
                blurDataURL={hoverLogo.blurDataURL}
                className="absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out group-hover/logo:opacity-100"
              />
            )}
          </div>
        </FadeIn>
        <FadeIn
          className={clsx(
            'work-timeline__copy mr-8 flex min-w-0 flex-col gap-1',
            {
              'md:ml-8 md:mr-0 md:text-right': align === 'right',
            },
          )}
        >
          <h3 className="work-timeline__title">{title}</h3>
          <p className="work-timeline__role">{subtitle}</p>
          <p className="work-timeline__date">{date}</p>
        </FadeIn>
        <div
          className={clsx(
            'work-timeline__line',
            align === 'left'
              ? 'work-timeline__line--spine-right'
              : 'work-timeline__line--spine-left',
          )}
          aria-hidden
        />
      </div>
      {align === 'left' && <div className="hidden md:block"></div>}
    </>
  );
};
