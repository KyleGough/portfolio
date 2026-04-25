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

  it('renders', () => {
    render(<Nav />);
    expect(
      screen.getByRole('navigation', { name: 'Main' })
    ).toBeInTheDocument();
  });
});
