import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { ProjectFilter } from './ProjectFilter';

describe('ProjectFilter component', () => {
  it('renders current filter and label', () => {
    const onFilter = jest.fn();
    render(
      <ProjectFilter filter="All" setFilterCallback={onFilter} />
    );
    expect(screen.getByText('Filter projects')).toBeVisible();
    expect(screen.getByText('All')).toBeVisible();
  });

  it('filter selection opens on click', () => {
    const onFilter = jest.fn();
    render(
      <ProjectFilter filter="All" setFilterCallback={onFilter} />
    );

    const filterBtn = screen.getByRole('button');

    // Filter list box is not rendered by default.
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

    // Clicking the component opens and renders the filter list.
    fireEvent.click(filterBtn);
    expect(screen.queryByRole('listbox')).toBeInTheDocument();
  });
});
