import { render, screen } from '@testing-library/react';
import React from 'react';

import { Chip } from './Chip';

describe('Chip component', () => {
  it('renders', async () => {
    const { container } = render(<Chip name="TypeScript" />);
    expect(await screen.findByText('TypeScript')).toBeVisible();
    expect(container).toMatchSnapshot();
  });
});
