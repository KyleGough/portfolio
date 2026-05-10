import { UnfoldIcon } from '@components/Icons';
import { clsx } from 'clsx';
import React, { useCallback, useEffect, useId, useRef, useState } from 'react';

import styles from './ProjectFilter.module.css';
import { ProjectFilterSelection } from './ProjectFilterSelection';

interface ProjectFilterProps {
  filter: string;
  setFilterCallback: (value: string) => void;
}

const filters = [
  'All',
  'C#',
  'C++',
  'JavaScript',
  'PHP',
  'Python',
  'React',
  'Three.js',
  'Web',
];

export const ProjectFilter: React.FC<ProjectFilterProps> = ({
  filter,
  setFilterCallback,
}) => {
  const [isOpen, setOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const baseId = String(useId());
  const labelId = `${baseId}-label`;
  const listId = `${baseId}-listbox`;

  const closeDropdown = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    // Close dropdown if user clicks outside project filter component.
    const checkClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };
    // Add listener on mount.
    document.addEventListener('click', checkClickOutside);
    // Remove listener on unmount.
    return () => {
      document.removeEventListener('click', checkClickOutside);
    };
  }, [closeDropdown]);

  // Sets the value of the filter.
  const setValue = (value: string) => {
    setFilterCallback(value);
    closeDropdown();
  };

  // Toggles opening/closing the dropdown list.
  const toggleDropdown = (event: React.MouseEvent) => {
    event.preventDefault();
    setOpen((prev) => !prev);
  };

  return (
    <>
      <p id={labelId} className={styles.label}>
        Filter projects
      </p>
      <div ref={filterRef} className={styles.root}>
        <button
          type="button"
          onClick={toggleDropdown}
          className={styles.trigger}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={listId}
          aria-labelledby={labelId}
        >
          <span className={styles.value}>{filter}</span>
          <UnfoldIcon
            className={clsx(styles.chevron, isOpen && styles.chevronOpen)}
          />
        </button>
        {isOpen && (
          <ul
            id={listId}
            className={styles.menu}
            role="listbox"
            aria-labelledby={labelId}
            aria-orientation="vertical"
          >
            {filters.map((name) => (
              <ProjectFilterSelection
                key={name}
                onSelect={setValue}
                selected={filter === name}
                value={name}
              />
            ))}
          </ul>
        )}
      </div>
    </>
  );
};
