import { render } from '@testing-library/react';
import React from 'react';

import { Footer } from './Footer';

describe('Footer component', () => {
  it('renders', async () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });
});
