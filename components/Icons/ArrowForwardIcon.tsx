import React from 'react';

import { IconProps } from './IconInterface';

export const ArrowForwardIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    enableBackground="new 0 0 24 24"
    viewBox="0 0 24 24"
  >
    <g>
      <path d="M0,0h24v24H0V0z" fill="none" />
    </g>
    <g>
      <polygon points="6.23,20.23 8,22 18,12 8,2 6.23,3.77 14.46,12" />
    </g>
  </svg>
);
