import mockIntersectionObserver from '@mocks/mockIntersectionObserver';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { ProjectCard } from './ProjectCard';

describe('ProjectCard component', () => {
  beforeEach(mockIntersectionObserver);

  it('renders', async () => {
    const { container } = render(
      <ProjectCard
        image={{
          src: '/#image',
          width: 100,
          height: 100,
          blurDataURL: '/#blur',
        }}
        alt="Alt Text"
        date={{ month: 4, year: 2022 }}
        link="/#project"
        logo="/#logo"
        logoAlt="Logo"
      />
    );

    expect(screen.getByText('April 2022')).toBeVisible();
    expect(container).toMatchSnapshot();
  });
});
