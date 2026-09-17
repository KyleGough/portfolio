import extruded from '@components/SpaceExtrudedTitle/extrudedTitle.module.css';
import { usePrefersReducedMotion } from '@hooks/usePrefersReducedMotion';
import { useScrollReveal } from '@hooks/useScrollReveal';
import { clsx } from 'clsx';
import React, { useMemo } from 'react';

import styles from './TelemetryHeading.module.css';

type HeadingTag = 'h1' | 'h2';
type Align = 'center' | 'start' | 'responsive';

interface TelemetryHeadingProps {
  /** Horizontal alignment. `responsive` = center on small screens, start from md. */
  align?: Align;
  as?: HeadingTag;
  className?: string;
  /** Apply the shared extruded Space Grotesk face (Projects / Privacy titles). */
  extrudedTitle?: boolean;
  id?: string;
  kicker?: string;
  title: string;
  titleClassName?: string;
  /** Use project-header scale (Work Experience) instead of case-study scale. */
  variant?: 'showcase' | 'section';
}

const DEPTH_LAYERS = 3;

export const TelemetryHeading: React.FC<TelemetryHeadingProps> = ({
  align = 'center',
  as = 'h2',
  className,
  extrudedTitle = false,
  id,
  kicker,
  title,
  titleClassName,
  variant = 'showcase',
}) => {
  const [rootRef, decoded] = useScrollReveal<HTMLDivElement>({
    ratio: 0.45,
    bottomExclusion: '20%',
  });
  const reducedMotion = usePrefersReducedMotion();
  const TitleTag = as;

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
                  reducedMotion
                    ? undefined
                    : { animationDelay: `${i * 42}ms` }
                }
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </span>
        </p>
      ) : null}

      <div className={styles.titleShell}>
        {!extrudedTitle ? (
          <span className={styles.depthStack} aria-hidden="true">
            {Array.from({ length: DEPTH_LAYERS }, (_, i) => (
              <span key={i} className={styles.depthLayer}>
                {title}
              </span>
            ))}
          </span>
        ) : null}

        <TitleTag
          id={id}
          className={clsx(
            styles.titleFace,
            {
              [styles.titleFaceInk]: !extrudedTitle,
              [styles.titleFaceH1]: as === 'h1',
              [styles.titleFaceProjectHeader]: variant === 'section',
              [extruded.nameExtruded]: extrudedTitle,
            },
            titleClassName,
          )}
        >
          {title}
        </TitleTag>

        <span className={styles.scan} aria-hidden="true" />
      </div>
    </div>
  );
};
