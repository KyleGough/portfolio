import { usePrefersReducedMotion } from '@hooks/usePrefersReducedMotion';
import { useScrollReveal } from '@hooks/useScrollReveal';
import { clsx } from 'clsx';
import React, { useMemo } from 'react';

import styles from './TelemetryHeading.module.css';

type Align = 'center' | 'start' | 'responsive';

interface TelemetryHeadingProps {
  /** Horizontal alignment. `responsive` = center on small screens, start from md. */
  align?: Align;
  className?: string;
  id?: string;
  kicker?: string;
  title: string;
  /** Use project-header scale (Work Experience) instead of case-study scale. */
  variant?: 'showcase' | 'section';
}

const DEPTH_LAYERS = 3;

export const TelemetryHeading: React.FC<TelemetryHeadingProps> = ({
  align = 'center',
  className,
  id,
  kicker,
  title,
  variant = 'showcase',
}) => {
  const [rootRef, decoded] = useScrollReveal<HTMLDivElement>({
    ratio: 0.45,
    bottomExclusion: '20%',
  });
  const reducedMotion = usePrefersReducedMotion();

  const kickerChars = useMemo(() => {
    if (!kicker) return [];
    return Array.from(kicker);
  }, [kicker]);

  return (
    <div
      ref={rootRef}
      className={clsx(
        styles.root,
        {
          [styles.alignCenter]: align === 'center',
          [styles.alignStart]: align === 'start',
          [styles.alignResponsive]: align === 'responsive',
          [styles.variantSection]: variant === 'section',
          [styles.rootDecoded]: decoded && !reducedMotion,
          [styles.rootStatic]: reducedMotion,
        },
        className,
      )}
    >
      {kicker ? (
        <p className={styles.kicker} aria-label={kicker}>
          <span aria-hidden="true">
            {kickerChars.map((char, i) => (
              <span
                key={`${char}-${i}`}
                className={styles.kickerChar}
                style={
                  reducedMotion ? undefined : { animationDelay: `${i * 42}ms` }
                }
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </span>
        </p>
      ) : null}

      <div className={styles.titleShell}>
        <span className={styles.depthStack} aria-hidden="true">
          {Array.from({ length: DEPTH_LAYERS }, (_, i) => (
            <span key={i} className={styles.depthLayer}>
              {title}
            </span>
          ))}
        </span>

        <h2
          id={id}
          className={clsx(styles.titleFace, styles.titleFaceInk, {
            [styles.titleFaceProjectHeader]: variant === 'section',
          })}
        >
          {title}
        </h2>

        <span className={styles.scan} aria-hidden="true" />
      </div>
    </div>
  );
};
