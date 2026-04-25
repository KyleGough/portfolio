import { render, screen } from '@testing-library/react';
import React from 'react';

import { Chip } from './Chip';

describe('Chip component', () => {
  it('renders the chip label', () => {
    render(<Chip name="TypeScript" />);
    expect(screen.getByText('TypeScript')).toBeVisible();
  });
});
