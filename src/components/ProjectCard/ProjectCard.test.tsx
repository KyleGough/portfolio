import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { mockIntersectionObserver } from '../../mocks/mockIntersectionObserver';
import { ProjectCard } from './ProjectCard';

describe('ProjectCard component', () => {
  beforeEach(mockIntersectionObserver);

  it('renders', async () => {
    const { container } = render(
      <BrowserRouter>
        <ProjectCard
          src="/#image"
          alt="Alt Text"
          tagline="Tagline"
          date="2022-04"
          link="/#project"
          chipText="Haskell"
        />
      </BrowserRouter>
    );

    expect(screen.getByText('Tagline')).toBeVisible();
    expect(screen.getByText('April 2022')).toBeVisible();
    expect(screen.getByText('Haskell')).toBeVisible();
    expect(container).toMatchSnapshot();
  });
});
