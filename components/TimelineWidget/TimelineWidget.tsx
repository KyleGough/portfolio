import AtomLogo from '@image/atom.png';
import BofaLogo from '@image/bofa.png';
import { clsx } from 'clsx';
import React from 'react';

import { TimelineNode } from './TimelineNode';

export const TimelineWidget: React.FC = () => (
  <div
    className={clsx(
      'grid grid-cols-1 md:grid-cols-2',
      'my-16 relative',
      'before:absolute before:content-[""] before:h-2/4 before:w-[2px]',
      'before:right-0 md:before:left-2/4',
      'before:bg-gradient-to-t before:from-timeline before:via-timeline before:to-transparent',
      'after:absolute after:content-[""] after:h-2/4 after:w-[2px]',
      'after:top-2/4 after:right-0 md:after:left-2/4',
      'after:bg-gradient-to-b after:from-timeline after:via-timeline after:to-transparent'
    )}
  >
    <TimelineNode
      title="Atom Learning"
      subtitle="Front-End Engineer"
      date="July 2022 - Present"
      align="left"
      logo={AtomLogo}
    />
    <TimelineNode
      title="Bank of America"
      subtitle="Tech Analyst"
      date="July 2020 - June 2022"
      align="right"
      logo={BofaLogo}
    />
    <TimelineNode
      title="Bank of America"
      subtitle="Summer Intern"
      date="June 2019 - August 2019"
      align="left"
      logo={BofaLogo}
    />
  </div>
);
