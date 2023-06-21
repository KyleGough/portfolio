import { render, screen } from '@testing-library/react';
import React from 'react';

import { LabelledLogo } from './LabelledLogo';

describe('LabelledLogo component', () => {
  it('renders', () => {
    const { container } = render(<LabelledLogo name="React" logo="/#" />);
    expect(screen.getByText('React')).toBeVisible();
    expect(container).toMatchSnapshot();
  });
});
