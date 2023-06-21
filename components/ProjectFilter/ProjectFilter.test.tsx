import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { ProjectFilter } from './ProjectFilter';

describe('ProjectFilter component', () => {
  it('renders', () => {
    const { container } = render(
      <ProjectFilter filter="All" setFilterCallback={() => jest.fn()} />
    );
    expect(container).toMatchSnapshot();
  });

  it('filter selection opens on click event', () => {
    render(<ProjectFilter filter="All" setFilterCallback={() => jest.fn()} />);

    const filterBtn = screen.getByRole('button');

    // Filter list box is not rendered by default.
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

    // Clicking the component opens and renders the filter list.
    fireEvent.click(filterBtn);
    expect(screen.queryByRole('listbox')).toBeInTheDocument();
  });
});
