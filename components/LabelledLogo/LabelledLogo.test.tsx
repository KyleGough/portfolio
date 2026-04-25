import { render, screen } from '@testing-library/react';
import React from 'react';

import { LabelledLogo } from './LabelledLogo';

describe('LabelledLogo component', () => {
  it('renders name and logo with accessible label', () => {
    render(<LabelledLogo name="React" logo="/#" />);
    expect(screen.getByText('React')).toBeVisible();
    expect(screen.getByRole('img', { name: 'React Logo' })).toBeInTheDocument();
  });
});
