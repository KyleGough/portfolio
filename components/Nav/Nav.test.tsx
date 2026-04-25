import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import React from 'react';

import { Nav } from './Nav';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

describe('Nav component', () => {
  beforeEach(() => {
    mockUseRouter.mockReturnValue({ asPath: '/' } as never);
  });

  afterEach(() => {
    mockUseRouter.mockReset();
  });

  it('renders the main navigation landmark', () => {
    render(<Nav />);
    expect(
      screen.getByRole('navigation', { name: 'Main' })
    ).toBeInTheDocument();
  });

  it('marks the projects link as current for project routes (desktop and drawer)', () => {
    mockUseRouter.mockReturnValue({ asPath: '/projects' } as never);
    render(<Nav />);
    const projectsLinks = screen.getAllByRole('link', { name: 'Projects' });
    expect(projectsLinks).toHaveLength(2);
    for (const link of projectsLinks) {
      expect(link).toHaveAttribute('aria-current', 'page');
    }
  });
});
