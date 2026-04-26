import { Link } from '@components/Link';
import extruded from '@components/SpaceExtrudedTitle/extrudedTitle.module.css';
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
        <span className={extruded.perspectiveWrapHero}>
          <span className={extruded.heroDigits}>
            <span className={styles.digit}>
              <span className={styles.digitInner}>4</span>
            </span>
            <span className={styles.digit}>
              <span className={styles.digitInner}>0</span>
            </span>
            <span className={styles.digit}>
              <span className={styles.digitInner}>4</span>
            </span>
          </span>
        </span>
      </h1>
      <p className={styles.subtitle}>Page not found</p>
      <p className={styles.blurb}>
        The route you requested does not exist. Plot a new course from the links
        below.
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
