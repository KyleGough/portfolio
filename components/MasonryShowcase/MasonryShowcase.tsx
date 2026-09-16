import heroStyles from '@components/Hero/Hero.module.css';
import { ArrowForwardIcon } from '@components/Icons';
import { TelemetryHeading } from '@components/TelemetryHeading';
import { usePrefersReducedMotion } from '@hooks/usePrefersReducedMotion';
import { useScrollReveal } from '@hooks/useScrollReveal';
import { getDateRange } from '@utilities/date';
import {
  type FeaturedCaseStudy,
  FEATURED_CASE_STUDIES,
} from '@utilities/featuredCaseStudies';
import { clsx } from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import styles from './MasonryShowcase.module.css';

const Tile: React.FC<{
  featured: FeaturedCaseStudy;
  index: number;
  priority: boolean;
}> = ({ featured, index, priority }) => {
  const when = getDateRange(featured.date);
  const img = featured.image;
  const [tileRef, acquired] = useScrollReveal<HTMLDivElement>({
    ratio: 0.28,
    bottomExclusion: '16%',
  });
  const reducedMotion = usePrefersReducedMotion();
  const columnDelayMs = reducedMotion ? 0 : (index % 2) * 140;

  return (
    <div
      ref={tileRef}
      className={clsx(styles.item, {
        [styles.itemAcquired]: acquired && !reducedMotion,
        [styles.itemStatic]: reducedMotion,
      })}
      style={
        reducedMotion
          ? undefined
          : ({ '--signal-delay': `${columnDelayMs}ms` } as React.CSSProperties)
      }
    >
      <Link className={styles.tile} href={featured.link}>
        <span className={styles.cadFrame} aria-hidden="true">
          <span className={clsx(styles.corner, styles.cornerTl)} />
          <span className={clsx(styles.corner, styles.cornerTr)} />
          <span className={clsx(styles.corner, styles.cornerBl)} />
          <span className={clsx(styles.corner, styles.cornerBr)} />
        </span>

        <div className={styles.image}>
          <div className={styles.imageSignal}>
            <Image
              className="home-feature-img"
              src={img}
              alt={featured.alt}
              fill
              placeholder="blur"
              blurDataURL={img.blurDataURL}
              priority={priority}
              sizes="(max-width: 1023px) 100vw, 50vw"
            />
            <span className={styles.chromaCyan} aria-hidden="true" />
            <span className={styles.chromaMagenta} aria-hidden="true" />
            <span className={styles.noiseMask} aria-hidden="true" />
          </div>
        </div>

        <div className={styles.body}>
          <div className={styles.bodyReveal}>
            <h3>{featured.title}</h3>
            <p className={styles.copy}>{featured.excerpt}</p>
            <div className={styles.foot}>
              <p className={styles.meta}>Case study · {when}</p>
              <span className={styles.arrow} aria-hidden>
                <ArrowForwardIcon className="h-3.5 w-3.5 fill-current" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

/**
 * Two-column bento: tall feature + matching-height tile. All link to case studies.
 */
export const MasonryShowcase: React.FC = () => {
  return (
    <section
      aria-labelledby="featured-heading"
      className={styles.section}
      id="featured-work"
    >
      <div className="container text-primary py-8 md:py-12">
        <header className={styles.heading}>
          <TelemetryHeading
            id="featured-heading"
            kicker="Selected"
            title="Case Studies"
            align="center"
          />
        </header>

        <div className={styles.masonryWrap}>
          <div className={styles.masonry}>
            {FEATURED_CASE_STUDIES.map((featured, i) => (
              <Tile
                key={featured.id}
                featured={featured}
                index={i}
                priority={i === 0}
              />
            ))}
          </div>
        </div>

        <p className={styles.strap}>
          <Link
            className={`${heroStyles.ctaButton} ${styles.viewAllInline}`}
            href="/projects"
          >
            View All Projects
          </Link>
        </p>
      </div>
    </section>
  );
};
