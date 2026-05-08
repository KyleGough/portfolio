import AtomLogo from '@image/atom.png';
import AtomOriginalLogo from '@image/atom-original.png';
import BofaLogo from '@image/bofa.png';
import BofaOriginalLogo from '@image/bofa-original.png';
import RipjarOriginalLogo from '@image/ripjar-original.png';
import RipjarLogo from '@image/ripjar.png';
import { clsx } from 'clsx';
import React from 'react';

import { TimelineNode } from './TimelineNode';

export const TimelineWidget: React.FC = () => (
  <div
    className={clsx(
      'work-timeline grid grid-cols-1 md:grid-cols-2',
      'relative my-10',
      'before:absolute before:content-[""] before:h-2/4 before:w-[3px]',
      'before:right-0 md:before:left-2/4',
      'after:absolute after:content-[""] after:h-2/4 after:w-[3px]',
      'after:top-2/4 after:right-0 md:after:left-2/4',
    )}
  >
    <TimelineNode
      title="Ripjar"
      subtitle="Senior Front-End Engineer"
      date="Apr 2023 → Present"
      align="left"
      hoverLogo={RipjarOriginalLogo}
      logo={RipjarLogo}
    />
    <TimelineNode
      title="Atom Learning"
      subtitle="Front-End Engineer"
      date="Jul 2022 → Jan 2023"
      align="right"
      hoverLogo={AtomOriginalLogo}
      logo={AtomLogo}
    />
    <TimelineNode
      title="Bank of America"
      subtitle="Tech Analyst"
      date="Jul 2020 → Jun 2022"
      align="left"
      hoverLogo={BofaOriginalLogo}
      logo={BofaLogo}
    />
    <TimelineNode
      title="Bank of America"
      subtitle="Summer Intern"
      date="Jun 2019 → Aug 2019"
      align="right"
      hoverLogo={BofaOriginalLogo}
      logo={BofaLogo}
    />
  </div>
);
