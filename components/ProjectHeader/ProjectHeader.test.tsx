import mockStaticImageData from '@mocks/mockStaticImageData';
import { render, screen } from '@testing-library/react';
import { Project } from '@utilities/types';
import React from 'react';

import { ProjectHeader } from './ProjectHeader';

const baseProject: Project = {
  id: 'portfolio',
  title: 'Portfolio',
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
  image: mockStaticImageData,
  alt: 'Portfolio Homepage',
  link: '/projects/portfolio',
  filters: ['JavaScript', 'Web'],
  description: 'Personal portfolio website',
  github: 'https://github.com/KyleGough/portfolio',
  skills: ['TypeScript', 'JavaScript'],
};

describe('ProjectHeader component', () => {
  it('renders', () => {
    render(<ProjectHeader project={baseProject} />);

    expect(screen.getByRole('heading', { name: 'Portfolio' })).toBeVisible();
    expect(screen.getByText('Jan 2021')).toBeVisible();
    expect(screen.getByText('Mar 2022')).toBeVisible();
    expect(screen.getByText('Personal portfolio website')).toBeVisible();
    expect(screen.getByText('TypeScript')).toBeVisible();
  });

  it('renders the live link before GitHub links', () => {
    render(
      <ProjectHeader
        project={{
          ...baseProject,
          liveLink: 'https://example.com',
        }}
        githubStargazerCount={12}
      />,
    );

    const live = screen.getByRole('link', { name: 'Live' });
    const github = screen.getByRole('link', { name: 'GitHub' });
    const stargazers = screen.getByRole('link', { name: '12' });

    expect(live.compareDocumentPosition(github)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
    expect(github.compareDocumentPosition(stargazers)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
  });
});
