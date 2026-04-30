import { render, screen } from '@testing-library/react';
import React from 'react';

import { ProjectItem } from './ProjectItem';

describe('ProjectItem component', () => {
  it('renders', () => {
    render(
      <ProjectItem
        title="New Project"
        date={{
          start: { month: 1, year: 2021 },
          end: { month: 6, year: 2022 },
        }}
        description="Sample Description"
        link="/#project"
        image={{
          src: '/#image',
          height: 100,
          width: 100,
          blurDataURL: '/#blur',
        }}
        alt="Test Alt Text"
      />,
    );
    expect(screen.getByText('Jan 2021 - Jun 2022')).toBeVisible();
  });
});
