import { ArrowBackIcon, ArrowForwardIcon } from '@components/Icons';
import { Section } from '@components/Section';
import { clsx } from 'clsx';
import Link from 'next/link';
import React from 'react';

interface PaginationProps {
  nextLink?: string;
  nextTitle?: string;
  previousLink?: string;
  previousTitle?: string;
}

const linkCardClass = (enabled: boolean) =>
  clsx(
    'project-pagination__card',
    /* Full width of grid track so the pair stays symmetric and centered in the wrapper. */
    'flex w-full min-h-[4.75rem] items-center gap-3 rounded-2xl border p-3.5 text-left no-underline',
    'transition [transition-property:box-shadow,transform,opacity] duration-200 [transition-timing-function:cubic-bezier(0.25,1,0.5,1)]',
    'sm:min-h-0 sm:gap-4 sm:p-4',
    enabled && [
      'group border-header/10 bg-background/90 text-link',
      'shadow-sm',
      'hover:border-link/25 hover:shadow-md',
      'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link/40',
      'motion-safe:hover:-translate-y-0.5',
      'motion-safe:active:translate-y-0 motion-safe:active:scale-[0.985]',
    ],
    !enabled && [
      'cursor-not-allowed border border-black/[0.06] bg-header/[0.04] text-disabled',
      'pointer-events-none opacity-[0.72]',
    ]
  );

export const Pagination: React.FC<PaginationProps> = ({
  previousTitle,
  previousLink,
  nextTitle,
  nextLink,
}) => {
  const hasPrevious = Boolean(previousTitle && previousLink);
  const hasNext = Boolean(nextTitle && nextLink);

  return (
    <Section>
      <div
        className="project-pagination__grid mx-auto grid w-full max-w-4xl grid-cols-1 items-stretch
          gap-4 sm:max-w-5xl sm:grid-cols-2 sm:gap-5"
      >
        {hasPrevious ? (
          <Link
            href={String(previousLink)}
            className={linkCardClass(true)}
            aria-label={`Previous project: ${String(previousTitle)}`}
          >
            <span
              className="project-pagination__icon-well flex h-10 w-10 flex-shrink-0
                items-center justify-center rounded-xl bg-link/[0.08]
                transition-[transform,background-color] duration-200
                [transition-timing-function:cubic-bezier(0.25,1,0.5,1)]
                group-hover:bg-link/[0.12] motion-safe:group-hover:scale-105"
              aria-hidden
            >
              <ArrowBackIcon
                className="h-5 w-5 fill-link
                  transition-[transform,fill] duration-200
                  [transition-timing-function:cubic-bezier(0.25,1,0.5,1)]
                  group-hover:fill-link-hover
                  group-hover:-translate-x-0.5 motion-reduce:group-hover:translate-x-0"
              />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[0.7rem] font-medium uppercase tracking-wider text-header/75">
                Previous
              </p>
              <p
                className="mt-0.5 line-clamp-2 font-primary text-base font-semibold text-header"
                title={previousTitle}
              >
                {previousTitle}
              </p>
            </div>
          </Link>
        ) : (
          <div
            className={linkCardClass(false)}
            aria-label="No previous project"
            role="group"
          >
            <span
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-header/10 opacity-50"
              aria-hidden
            >
              <ArrowBackIcon className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[0.7rem] font-medium uppercase tracking-wider">
                Previous
              </p>
              <p className="text-light mt-0.5 text-sm">—</p>
            </div>
          </div>
        )}

        {hasNext ? (
          <Link
            href={String(nextLink)}
            className={linkCardClass(true)}
            aria-label={`Next project: ${String(nextTitle)}`}
          >
            <div className="min-w-0 flex-1 text-right">
              <p className="text-[0.7rem] font-medium uppercase tracking-wider text-header/75">
                Next
              </p>
              <p
                className="mt-0.5 line-clamp-2 font-primary text-base font-semibold text-header"
                title={nextTitle}
              >
                {nextTitle}
              </p>
            </div>
            <span
              className="project-pagination__icon-well flex h-10 w-10 flex-shrink-0
                items-center justify-center rounded-xl bg-link/[0.08]
                transition-[transform,background-color] duration-200
                [transition-timing-function:cubic-bezier(0.25,1,0.5,1)]
                group-hover:bg-link/[0.12] motion-safe:group-hover:scale-105"
              aria-hidden
            >
              <ArrowForwardIcon
                className="h-5 w-5 fill-link
                  transition-[transform,fill] duration-200
                  [transition-timing-function:cubic-bezier(0.25,1,0.5,1)]
                  group-hover:fill-link-hover
                  group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0"
              />
            </span>
          </Link>
        ) : (
          <div
            className={linkCardClass(false)}
            aria-label="No next project"
            role="group"
          >
            <div className="min-w-0 flex-1 text-right">
              <p className="text-[0.7rem] font-medium uppercase tracking-wider">
                Next
              </p>
              <p className="text-light mt-0.5 text-sm">—</p>
            </div>
            <span
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-header/10 opacity-50"
              aria-hidden
            >
              <ArrowForwardIcon className="h-5 w-5" />
            </span>
          </div>
        )}
      </div>
    </Section>
  );
};
