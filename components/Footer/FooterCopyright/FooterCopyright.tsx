import dayjs from 'dayjs';
import React from 'react';

import styles from './FooterCopyright.module.css';

const COPYRIGHT_START = 2016;

export const FooterCopyright: React.FC = () => {
  const yearEnd = dayjs().year();
  return (
    <div className={styles.band}>
      <div className={styles.inner}>
        <span className="sr-only">Copyright </span>
        <span aria-hidden="true">© </span>
        <time className={styles.years} dateTime={String(COPYRIGHT_START)}>
          {COPYRIGHT_START}
        </time>
        <span className={styles.dash} aria-hidden="true">
          –
        </span>
        <time className={styles.years} dateTime={String(yearEnd)}>
          {yearEnd}
        </time>
        {', '}
        <span className={styles.name}>Kyle Gough</span>
      </div>
    </div>
  );
};
