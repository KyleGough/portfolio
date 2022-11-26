import { render, screen } from '@testing-library/react';
import React from 'react';

import { ProjectItem } from './ProjectItem';

describe('ProjectItem component', () => {
  it('renders', async () => {
    const { container } = render(
      <ProjectItem
        title="New Project"
        date={{
          start: { month: 1, year: 2021 },
          end: { month: 6, year: 2022 },
        }}
        description="Sample Description"
        link="/#project"
        src="/#image"
        alt="Test Alt Text"
        logo="/#logo"
      />
    );
    expect(screen.getByText('January 2021 - June 2022')).toBeVisible();
    expect(container).toMatchSnapshot();
  });
});
