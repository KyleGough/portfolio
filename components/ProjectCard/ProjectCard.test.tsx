import { render, screen } from '@testing-library/react';
import React from 'react';

import { mockIntersectionObserver } from '../../mocks/mockIntersectionObserver';
import { ProjectCard } from './ProjectCard';

describe('ProjectCard component', () => {
  beforeEach(mockIntersectionObserver);

  it('renders', async () => {
    const { container } = render(
      <ProjectCard
        src="/#image"
        alt="Alt Text"
        date={{ month: 4, year: 2022 }}
        link="/#project"
        chipText="Haskell"
      />
    );

    expect(screen.getByText('April 2022')).toBeVisible();
    expect(screen.getByText('Haskell')).toBeVisible();
    expect(container).toMatchSnapshot();
  });
});