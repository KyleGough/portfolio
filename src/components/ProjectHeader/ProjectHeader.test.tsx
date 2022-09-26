import { render, screen } from '@testing-library/react';
import React from 'react';

import { IProject } from '../../data';
import { ProjectHeader } from './ProjectHeader';

const baseProject: IProject = {
  id: 'portfolio',
  title: 'Portfolio',
  subtitle: 'Passion Project',
  date: {
    start: '2021-01',
    end: '2022-03',
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
