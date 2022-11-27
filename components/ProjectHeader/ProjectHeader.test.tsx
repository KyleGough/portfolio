import { render, screen } from '@testing-library/react';
import { Project } from '@utilities/types';
import React from 'react';

import { ProjectHeader } from './ProjectHeader';

const baseProject: Project = {
  id: 'portfolio',
  title: 'Portfolio',
  subtitle: 'Passion Project',
  date: {
    start: {
      month: 1,
      year: 2021,
    },
    end: {
      month: 3,
      year: 2022,
    },
  },
  video: '/#video',
  src: '/#image',
  alt: 'Portfolio Homepage',
  link: '/projects/portfolio',
  filters: ['JavaScript', 'Web'],
  description: 'Personal portfolio website',
  github: 'https://github.com/KyleGough/portfolio',
  skills: {
    active: ['TypeScript', 'JavaScript'],
    disabled: ['PHP'],
  },
  logo: {
    src: '/#logo',
    alt: 'Logo',
  },
};

describe('ProjectHeader component', () => {
  it('renders', async () => {
    const { container } = render(<ProjectHeader project={baseProject} />);

    expect(screen.getByText('Portfolio')).toBeVisible();
    expect(screen.getByText('Passion Project')).toBeVisible();
    expect(screen.getByText('January 2021')).toBeVisible();
    expect(screen.getByText('March 2022')).toBeVisible();
    expect(screen.getByText('Personal portfolio website')).toBeVisible();
    expect(screen.getByText('TypeScript')).toBeVisible();
    expect(screen.getByText('PHP')).toBeVisible();

    expect(container).toMatchSnapshot();
  });
});
