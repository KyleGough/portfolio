import React from 'react';

import styles from './Starfield.module.css';

interface Star {
  left: string;
  opacity: number;
  size: string;
  top: string;
}

const makeSeededRandom = (seed: number): (() => number) => {
  let value = seed;
  return () => {
    value = (value + 0x6d2b79f5) | 0;
    let t = Math.imul(value ^ (value >>> 15), 1 | value);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const makeStars = (
  seed: number,
  count: number,
  minRadius: number,
  maxRadius: number,
  minOpacity: number,
  maxOpacity: number,
): Star[] => {
  const random = makeSeededRandom(seed);
  const stars: Star[] = [];

  for (let i = 0; i < count; i += 1) {
    const radius = minRadius + random() * (maxRadius - minRadius);
    const left = random() * 100;
    const distanceFromCenter = Math.abs(50 - left);
    const opacityFalloff = (50 - distanceFromCenter) / 150;
    const opacity = minOpacity + random() * (maxOpacity - minOpacity) - opacityFalloff;
    
    stars.push({
      left: `${left.toFixed(2)}%`,
      top: `${(random() * 100).toFixed(2)}%`,
      size: `${radius.toFixed(2)}px`,
      opacity: Number(opacity.toFixed(3)),
    });
  }

  return stars;
};

const FAR_STARS = makeStars(13579, 100, 1, 1.65, 0.1, 0.55);
const MID_STARS = makeStars(97531, 80, 1, 2.3, 0.18, 0.66);
const NEAR_STARS = makeStars(24680, 60, 1.2, 3.1, 0.25, 0.75);

const renderStars = (stars: Star[]): React.ReactNode =>
  stars.map((star, index) => (
    <React.Fragment key={`${index}-${star.left}-${star.top}-${star.size}`}>
      <span
        className={styles.star}
        style={{
          left: star.left,
          top: star.top,
          width: star.size,
          height: star.size,
          opacity: star.opacity,
        }}
      />
      <span
        className={`${styles.star} ${styles.starClone}`}
        style={{
          left: star.left,
          top: star.top,
          width: star.size,
          height: star.size,
          opacity: star.opacity,
        }}
      />
    </React.Fragment>
  ));

export const Starfield: React.FC = () => {
  return (
    <div className={`starfield ${styles.starfield}`} aria-hidden>
      <div className={styles.layerFar}>
        <div className={styles.layerDrift}>{renderStars(FAR_STARS)}</div>
      </div>
      <div className={styles.layerMid}>
        <div className={styles.layerDrift}>{renderStars(MID_STARS)}</div>
      </div>
      <div className={styles.layerNear}>
        <div className={styles.layerDrift}>{renderStars(NEAR_STARS)}</div>
      </div>
    </div>
  );
};
