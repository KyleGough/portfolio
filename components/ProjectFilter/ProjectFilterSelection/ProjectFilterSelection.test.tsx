import { render, screen } from '@testing-library/react';
import React from 'react';

import { ProjectFilterSelection } from './ProjectFilterSelection';

describe('ProjectFilterSelection component', () => {
  it('renders the selected value', () => {
    const onSelect = jest.fn();
    render(
      <ProjectFilterSelection
        value="Web"
        count={5}
        onSelect={onSelect}
        selected={false}
      />,
    );

    expect(screen.getByText('Web')).toBeVisible();
    expect(screen.getByText('(5)')).toBeVisible();
  });
});
