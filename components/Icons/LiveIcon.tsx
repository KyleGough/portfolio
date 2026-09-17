import React from 'react';

import { IconProps } from './IconInterface';

export const LiveIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 0 24 24"
    width="24px"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M12 11c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 2c0-3.31-2.69-6-6-6s-6 2.69-6 6c0 1.66.67 3.16 1.76 4.24l1.42-1.42C8.45 15.1 8 14.11 8 13c0-2.21 1.79-4 4-4s4 1.79 4 4c0 1.11-.45 2.1-1.18 2.82l1.42 1.42C17.33 16.16 18 14.66 18 13zM12 3C6.48 3 2 7.48 2 13c0 2.76 1.12 5.26 2.93 7.07l1.42-1.42C4.9 17.21 4 15.21 4 13c0-4.42 3.58-8 8-8s8 3.58 8 8c0 2.21-.9 4.21-2.35 5.65l1.42 1.42C20.88 18.26 22 15.76 22 13c0-5.52-4.48-10-10-10z" />
  </svg>
);
