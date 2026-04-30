import { clsx } from 'clsx';
import React, { KeyboardEvent } from 'react';

import styles from './ProjectFilterSelection.module.css';

interface ProjectFilterSelectionProps {
  onSelect: (a: string) => void;
  selected: boolean;
  value: string;
}

export const ProjectFilterSelection: React.FC<ProjectFilterSelectionProps> = ({
  value,
  onSelect,
  selected,
}) => {
  const onKey = (v: string, event: KeyboardEvent<HTMLLIElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect(v);
    }
  };

  return (
    <li
      tabIndex={0}
      role="option"
      aria-selected={selected}
      onClick={() => onSelect(value)}
      onKeyDown={(event: KeyboardEvent<HTMLLIElement>) => onKey(value, event)}
      className={clsx(styles.option, selected && styles.selected)}
    >
      {value}
    </li>
  );
};
