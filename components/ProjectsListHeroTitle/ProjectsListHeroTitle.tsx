import React from 'react';

import styles from './ProjectsListHeroTitle.module.css';

/**
 * Projects index page display title: glass plate + wireframe-stroked type
 * (space-gothic); calm frosted label on default theme.
 */
export const ProjectsListHeroTitle: React.FC = () => (
  <h1 className={styles.heroTitle}>
    <span className={styles.heroGlass} data-text="Projects">
      Projects
    </span>
  </h1>
);
