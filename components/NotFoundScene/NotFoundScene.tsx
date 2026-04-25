import { Link } from '@components/Link';
import React from 'react';

import styles from './NotFoundScene.module.css';

export const NotFoundScene: React.FC = () => (
  <div className={styles.root}>
    <div className={styles.backdrop} aria-hidden="true">
      <div className={styles.perspective}>
        <div className={styles.gridFloor} />
      </div>
    </div>

    <div className={styles.content}>
      <p className={styles.signal}>signal lost</p>
      <h1 id="not-found-heading" className={styles.titleBlock}>
        <span className={styles.digits}>
          <span className={styles.digit}>4</span>
          <span className={styles.digit}>0</span>
          <span className={styles.digit}>4</span>
        </span>
      </h1>
      <p className={styles.subtitle}>Page not in this orbit</p>
      <p className={styles.blurb}>
        The route you requested is not on this map. Plot a new course from the
        links below.
      </p>

      <nav className={styles.nav} aria-label="Site recovery">
        <Link to="/">Home</Link>
        <span className={styles.sep} aria-hidden="true">
          ·
        </span>
        <Link to="/about">About</Link>
        <span className={styles.sep} aria-hidden="true">
          ·
        </span>
        <Link to="/projects">Projects</Link>
        <span className={styles.sep} aria-hidden="true">
          ·
        </span>
        <Link href="https://github.com/KyleGough">GitHub</Link>
      </nav>
    </div>
  </div>
);
