import { render, screen } from '@testing-library/react';
import React from 'react';

import { UniModuleList } from './UniModuleList';

describe('UniModuleList component', () => {
  it('renders', async () => {
    const { container } = render(
      <UniModuleList name="Year 3">
        <li>Machine Learning</li>
      </UniModuleList>
    );

    expect(screen.getByText('Year 3')).toBeVisible();
    expect(screen.getByText('Machine Learning')).toBeVisible();
    expect(container).toMatchSnapshot();
  });
});
