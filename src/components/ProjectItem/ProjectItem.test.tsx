import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ProjectItem } from './ProjectItem';

describe('ProjectItem component', () => {
  it('renders', async () => {
    const { container } = render(
      <BrowserRouter>
        <ProjectItem
          title="New Project"
          date={{ start: '2021-01', end: '2022-06' }}
          description="Sample Description"
          link="/#project"
          src="/#image"
          alt="Test Alt Text"
        />
      </BrowserRouter>
    );
    expect(screen.getByText('January 2021 - June 2022')).toBeVisible();
    expect(container).toMatchSnapshot();
  });
});
