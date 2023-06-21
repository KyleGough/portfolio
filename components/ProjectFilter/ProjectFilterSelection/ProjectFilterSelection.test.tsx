import { render, screen } from '@testing-library/react';
import React from 'react';

import { ProjectFilterSelection } from './ProjectFilterSelection';

describe('ProjectFilterSelection component', () => {
  it('renders', () => {
    const { container } = render(
      <ProjectFilterSelection value="Web" onSelect={() => jest.fn()} />
    );

    expect(screen.getByText('Web')).toBeVisible();
    expect(container).toMatchSnapshot();
  });
});
