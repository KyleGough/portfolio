import React from 'react';

interface ChipProps {
  name: string;
  disabled?: boolean;
}

export const Chip: React.FC<ChipProps> = ({ name, disabled }) => (
  <div
    className={`text-xs px-4 py-0.5 h-8 leading-chip rounded-2xl font-extrabold ${
      disabled ? 'text-disabled bg-chip-old' : 'text-chip bg-chip-light'
    }`}
  >
    {name}
  </div>
);
