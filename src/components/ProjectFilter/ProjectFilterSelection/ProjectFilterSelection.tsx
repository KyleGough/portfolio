import React from 'react';

interface ProjectFilterSelectionProps {
  value: string;
  onClick: (a: string) => void;
}

export const ProjectFilterSelection: React.FC<ProjectFilterSelectionProps> = ({
  value,
  onClick,
}) => (
  <li
    key={value}
    onClick={() => onClick(value)}
    className="hover:text-chip hover:bg-chip-light py-2 px-8 cursor-pointer select-none"
  >
    {value}
  </li>
);
