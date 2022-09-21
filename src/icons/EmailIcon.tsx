import React from 'react';

import { IconProps } from './IconInterface';

export const EmailIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 0 24 24"
    width="24px"
  >
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path
      className="block group-hover:hidden group-focus:hidden"
      d="M22 4H2v16h20V4zm-2 4l-8 5-8-5V6l8 5 8-5v2z"
    />
    <path
      className="hidden group-hover:block group-focus:block"
      d="M21.99 6.86L12 1 2 6.86V20h20l-.01-13.14zM12 13L3.74 7.84 12 3l8.26 4.84L12 13z"
    />
  </svg>
);
