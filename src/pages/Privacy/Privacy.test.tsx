import { render } from '@testing-library/react';
import React from 'react';

import { Privacy } from './Privacy';

describe('Privacy component', () => {
  it('renders', async () => {
    const { container } = render(<Privacy />);
    expect(container).toMatchSnapshot();
  });
});
