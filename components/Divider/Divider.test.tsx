import { render, screen } from '@testing-library/react';
import React from 'react';

import { Divider } from './Divider';

describe('Divider component', () => {
  it('renders a horizontal rule', () => {
    render(<Divider />);
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });
});
