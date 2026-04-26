import { Link } from '@components/Link';
import dynamic from 'next/dynamic';
import React from 'react';

import styles from './HomeHeroVariants.module.css';

const INTRO =
  'Senior Front-End Engineer at Ripjar. I have a Master of Engineering degree from Warwick University. My interests lie in cycling, guitar, movies, and physics (cosmology and quantum mechanics). I enjoy learning and acquiring new skills and putting them into practice.';

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
        aria-label="Three-dimensional wireframe of a Falcon Heavy class rocket: one center core with two side boosters, nose cones, and nine-engine octawebs on each first stage."
      >
        <FalconHeavyWireframeHero />
      </div>
      <div className={styles.copy}>
        <h1 className={styles.name}>Kyle Gough</h1>
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
