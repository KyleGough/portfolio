import React from 'react';

interface ChipProps {
  name: string;
}

export const Chip: React.FC<ChipProps> = ({ name }) => (
  <div className="text-chip bg-chip-light text-xs px-4 py-0.5 h-8 leading-chip rounded-2xl font-extrabold">
    {name}
  </div>
);
