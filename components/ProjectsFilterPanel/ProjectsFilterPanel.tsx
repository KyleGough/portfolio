import { ProjectFilter } from '@components/ProjectFilter';
import React from 'react';

import styles from './ProjectsFilterPanel.module.css';

interface ProjectsFilterPanelProps {
  filter: string;
  setFilter: (value: string) => void;
}

/**
 * Wrapper for the project list filter: no band background; z-index for dropdown.
 */
export const ProjectsFilterPanel: React.FC<ProjectsFilterPanelProps> = ({
  filter,
  setFilter,
}) => (
  <div className={`${styles.panel} projects-filter-wrapper`}>
    <div className="container text-primary py-5 pb-9 md:py-6 md:pb-10">
      <ProjectFilter filter={filter} setFilterCallback={setFilter} />
    </div>
  </div>
);
