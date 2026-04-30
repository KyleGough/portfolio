import { FadeIn } from '@components/FadeIn';
import heroStyles from '@components/Hero/Hero.module.css';
import { ArrowForwardIcon } from '@components/Icons';
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
  priority: boolean;
}> = ({ featured, priority }) => {
  const when = getDateRange(featured.date);
  const isSudoku = featured.id === 'sudoku';
  const img = featured.image;

  return (
    <FadeIn className={styles.item}>
      <Link
        className={clsx(styles.tile, isSudoku && styles.tileSudoku)}
        href={featured.link}
      >
        <div className={styles.image}>
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
        </div>
        <div className={styles.body}>
          <h3>{featured.title}</h3>
          <p className={styles.copy}>{featured.excerpt}</p>
          <div className={styles.foot}>
            <p className={styles.meta}>Case study · {when}</p>
            <span className={styles.arrow} aria-hidden>
              <ArrowForwardIcon className="h-3.5 w-3.5 fill-current" />
            </span>
          </div>
        </div>
      </Link>
    </FadeIn>
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
          <p className={styles.headingKicker}>Selected</p>
          <h2 className={styles.title} id="featured-heading">
            Case Studies
          </h2>
        </header>

        <div className={styles.masonryWrap}>
          <div className={styles.masonry}>
            {FEATURED_CASE_STUDIES.map((featured, i) => (
              <Tile key={featured.id} featured={featured} priority={i === 0} />
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
