import React, { KeyboardEvent } from 'react';

interface ProjectFilterSelectionProps {
  onSelect: (a: string) => void;
  value: string;
}

export const ProjectFilterSelection: React.FC<ProjectFilterSelectionProps> = ({
  value,
  onSelect,
}) => {
  const onKeyDown = (value: string, event: KeyboardEvent<HTMLLIElement>) => {
    if (event.key === 'Enter') onSelect(value);
  };

  return (
    <li
      key={value}
      tabIndex={0}
      onClick={() => onSelect(value)}
      onKeyDown={(event: KeyboardEvent<HTMLLIElement>) =>
        onKeyDown(value, event)
      }
      className="hover:text-chip hover:bg-chip-light py-2 px-8 cursor-pointer select-none"
    >
      {value}
    </li>
  );
};
