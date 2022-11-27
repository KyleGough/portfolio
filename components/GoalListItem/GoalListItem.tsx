import { clsx } from 'clsx';
import React from 'react';

interface GoalListItemProps {
  name: string;
  progress: Progress;
}

export enum Progress {
  RED = 'before:border-traffic-red',
  AMBER = 'before:border-traffic-amber',
  GREEN = 'before:border-traffic-green',
}

export const GoalListItem: React.FC<GoalListItemProps> = ({
  name,
  progress,
}) => (
  <li
    className={clsx(
      progress,
      'relative my-4',
      'before:content-[""]',
      'before:absolute before:-left-12',
      'before:w-6 before:h-6',
      'before:border-2 before:rounded-xl'
    )}
  >
    {name}
  </li>
);
