import { clsx } from 'clsx';
import React, { useEffect, useRef, useState } from 'react';

import { UnfoldIcon } from '../../icons';
import { ProjectFilterSelection } from './ProjectFilterSelection';

interface ProjectFilterProps {
  filter: string;
  setFilterCallback: (value: string) => void;
}

export const ProjectFilter: React.FC<ProjectFilterProps> = ({
  filter,
  setFilterCallback,
}) => {
  const [isOpen, setOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

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
  }, []);

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

  // Closes the dropdown list.
  const closeDropdown = () => {
    setOpen(false);
  };

  return (
    <>
      <p className="text-sm mb-2 ml-2 font-bold text-link text-center md:text-left">
        Filter Projects
      </p>
      <div ref={filterRef} className="relative w-64 mx-auto md:mx-0">
        <button
          onClick={toggleDropdown}
          className="group relative w-full pl-6 pr-12 py-4 cursor-pointer bg-background ring-0 rounded-sm shadow border-light"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls="project-filter-selection"
        >
          <span className="text-link group-hover:text-link-hover float-left">
            {filter}
          </span>
          <UnfoldIcon className="w-8 h-8 absolute top-[12px] right-0 flex items-center pr-2 pointer-events-none fill-link group-hover:fill-link-hover" />
        </button>
        <ul
          id="project-filter-selection"
          className={clsx(
            { absolute: isOpen },
            { hidden: !isOpen },
            'w-full max-h-[75vh]',
            'z-[100] overflow-y-auto',
            'mt-4 py-2',
            'shadow rounded text-link bg-background'
          )}
          role="listbox"
          aria-orientation="vertical"
        >
          <ProjectFilterSelection onSelect={setValue} value="All" />
          <ProjectFilterSelection onSelect={setValue} value="C#" />
          <ProjectFilterSelection onSelect={setValue} value="C++" />
          <ProjectFilterSelection onSelect={setValue} value="JavaScript" />
          <ProjectFilterSelection onSelect={setValue} value="PHP" />
          <ProjectFilterSelection onSelect={setValue} value="Python" />
          <ProjectFilterSelection onSelect={setValue} value="React" />
          <ProjectFilterSelection onSelect={setValue} value="Games/Puzzles" />
          <ProjectFilterSelection onSelect={setValue} value="Group Projects" />
          <ProjectFilterSelection onSelect={setValue} value="Web" />
        </ul>
      </div>
    </>
  );
};
