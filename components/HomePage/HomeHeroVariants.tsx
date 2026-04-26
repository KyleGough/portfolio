import { Link } from '@components/Link';
import extruded from '@components/SpaceExtrudedTitle/extrudedTitle.module.css';
import dynamic from 'next/dynamic';
import React from 'react';

import { CodeGenSkeleton } from './CodeGenSkeleton';
import styles from './HomeHeroVariants.module.css';

const INTRO =
  'Specialising in building scalable, performant web applications with TypeScript and React. My interests lie in cosmology, science-fiction, cycling, guitar, and board games.';

const FalconHeavyWireframeHero = dynamic(
  () =>
    import('./FalconHeavyWireframeHero').then(
      (m) => m.FalconHeavyWireframeHero
    ),
  {
    ssr: false,
    loading: () => (
      <div className={styles.rocketFrame} aria-hidden>
        <div className={styles.rocketCanvasHost} />
      </div>
    ),
  }
);

/**
 * Home hero: Falcon Heavy style wireframe (Three.js) + copy (space-gothic).
 */
export const HomeHeroVariants: React.FC = () => {
  return (
    <header className={styles.slot} aria-label="Welcome">
      <div
        className={styles.graphic}
        role="img"
        aria-label="Three-dimensional wireframe of a Falcon Heavy class rocket beside an abstract scrolling code skeleton: one center core with two side boosters, nose cones, and nine-engine octawebs on each first stage."
      >
        <div className={styles.graphicStage}>
          <FalconHeavyWireframeHero />
          <div className={styles.codeGenDock}>
            <CodeGenSkeleton />
          </div>
        </div>
      </div>
      <div className={styles.copy}>
        <h1 className={styles.name}>
          <span className={extruded.nameExtruded}>Kyle Gough</span>
        </h1>
        <p className={styles.eyebrow}>Senior Front-End Engineer</p>
        <p className={styles.intro}>{INTRO}</p>
        <div className={styles.cta}>
          <Link className={styles.ctaButton} to="/projects">
            View Projects
          </Link>
        </div>
      </div>
    </header>
  );
};
