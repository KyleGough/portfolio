import { clsx } from 'clsx';
import React from 'react';

interface ChipProps {
  name: string;
  disabled?: boolean;
}

export const Chip: React.FC<ChipProps> = ({ name, disabled }) => (
  <div
    className={clsx(
      { 'text-disabled bg-chip-old': disabled },
      { 'text-chip bg-chip-light': !disabled },
      'text-xs px-4 py-0.5 h-8 leading-chip rounded-2xl font-extrabold'
    )}
  >
    {name}
  </div>
);
