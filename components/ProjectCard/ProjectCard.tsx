import { FadeIn } from '@components/FadeIn';
import { getFormattedDate, getShortDate } from '@utilities/date';
import { Date } from '@utilities/types';
import { clsx } from 'clsx';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import React from 'react';

interface ProjectCardProps {
  className?: string;
  image: StaticImageData;
  alt: string;
  date: Date;
  link: string;
  logo: string;
  logoAlt: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  className,
  image,
  alt,
  date,
  link,
  logo,
  logoAlt,
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
            <Image
              src={image.src}
              alt={alt}
              width={image.width}
              height={image.height}
              placeholder="blur"
              blurDataURL={image.blurDataURL}
            />
          </div>
          <div className="text-white p-4 font-bold group-hover:brightness-125 group-focus:brightness-125 bg-nav-light">
            <div className="flex justify-between items-center">
              <p className="text-sm opacity-80">
                <time dateTime={getShortDate(date)}>
                  {getFormattedDate(date)}
                </time>
              </p>
              <Image src={logo} alt={logoAlt} width={30} height={30} />
            </div>
          </div>
        </FadeIn>
      </div>
    </Link>
  );
};
