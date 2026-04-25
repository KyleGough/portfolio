import { clsx } from 'clsx';
import React from 'react';

import styles from './extrudedTitle.module.css';

interface ExtrudedHeroTitleProps {
  className?: string;
  id?: string;
  title: string;
}

/**
 * Extruded Space Grotesk line (layered shadows, no 3D skew), left-aligned;
 * matches 404 hero treatment; wraps for long titles.
 */
export const ExtrudedHeroTitle: React.FC<ExtrudedHeroTitleProps> = ({
  title,
  id,
  className,
}) => {
  const chars = Array.from(title);
  return (
    <h1 id={id} className={clsx(styles.h1ProjectExtruded, className)}>
      <span className="sr-only">{title}</span>
      <span className="block" aria-hidden="true">
        <span className={styles.perspectiveWrapHero}>
          <span className={clsx(styles.heroDigits, styles.heroDigitsProject)}>
            {chars.map((ch, i) => (
              <span
                className={styles.digit}
                key={`${title}-idx-${i}`}
                style={{ animationDelay: `${Math.min(i, 24) * 80}ms` }}
              >
                <span className={styles.digitInner}>
                  {ch === ' ' ? '\u00A0' : ch}
                </span>
              </span>
            ))}
          </span>
        </span>
      </span>
    </h1>
  );
};
