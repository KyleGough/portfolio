import { FadeIn } from '@components/FadeIn';
import { ArrowForwardIcon } from '@components/Icons';
import imageMars from '@image/mars.png';
import imageSudoku from '@image/sudoku1.jpg';
import { getDateRange } from '@utilities/date';
import { getProjectData } from '@utilities/Project';
import { clsx } from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import heroStyles from './HomeHeroVariants.module.css';
import styles from './HomeMasonryShowcase.module.css';

const EXCERPTS: Record<string, string> = {
  'solar-system':
    'Interactive 3D solar system in the browser, with orbits, lighting, and a careful balance of performance and feel.',
  sudoku:
    'A Sudoku engine that works without backtracking, with stepwise explanations of every deduction.',
};

type Placed = { image: typeof imageMars; key: string };

const LAYOUT: Placed[] = [
  { image: imageMars, key: 'solar-system' },
  { image: imageSudoku, key: 'sudoku' },
];

const Tile: React.FC<{
  excerpt: string;
  label: string;
  priority: boolean;
  projectKey: string;
  src: typeof imageMars;
}> = ({ projectKey, src, excerpt, label, priority }) => {
  const p = getProjectData(projectKey);
  const when = p.date ? getDateRange(p.date) : '';
  const isSudoku = projectKey === 'sudoku';

  return (
    <FadeIn className={styles.item}>
      <Link
        className={clsx(styles.tile, isSudoku && styles.tileSudoku)}
        href={p.link}
      >
        <div className={styles.image}>
          <Image
            className="home-feature-img"
            src={src.src}
            alt={p.alt}
            fill
            placeholder="blur"
            blurDataURL={src.blurDataURL}
            priority={priority}
            sizes="(max-width: 1023px) 100vw, 50vw"
          />
        </div>
        <div className={styles.body}>
          <h3>{p.title}</h3>
          <p className={styles.copy}>{excerpt}</p>
          <div className={styles.foot}>
            <p className={styles.meta}>
              {label} · {when}
            </p>
            <p className={styles.arrow} aria-hidden>
              ↗
            </p>
          </div>
        </div>
      </Link>
    </FadeIn>
  );
};

/**
 * Two-column bento: tall feature + matching-height tile. All link to case studies.
 */
export const HomeMasonryShowcase: React.FC = () => {
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
            {LAYOUT.map((item, i) => (
              <Tile
                key={item.key}
                projectKey={item.key}
                src={item.image}
                excerpt={EXCERPTS[item.key]}
                label="Case study"
                priority={i === 0}
              />
            ))}
          </div>
        </div>

        <p className={styles.strap}>
          <Link
            className={clsx(heroStyles.ctaButton, styles.viewAllInline)}
            href="/projects"
          >
            <span>View All Projects</span>
            <span className={styles.viewAllIcon} aria-hidden>
              <ArrowForwardIcon className="h-[1.125rem] w-[1.125rem] fill-current" />
            </span>
          </Link>
        </p>
      </div>
    </section>
  );
};
