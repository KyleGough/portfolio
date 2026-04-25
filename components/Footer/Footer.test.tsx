import { render, screen } from '@testing-library/react';
import React from 'react';

import { Footer } from './Footer';

describe('Footer component', () => {
  it('renders', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
