import { render, screen } from '@testing-library/react';
import React from 'react';

import { ProjectChip } from './ProjectChip';

describe('ProjectChip component', () => {
  it('renders', async () => {
    const { container } = render(<ProjectChip name="C++" />);

    expect(screen.getByText('C++')).toBeVisible();
    expect(container).toMatchSnapshot();
  });
});
