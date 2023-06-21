import { render } from '@testing-library/react';
import React from 'react';

import { Nav } from './Nav';

describe('Nav component', () => {
  it('renders', () => {
    const { container } = render(<Nav />);
    expect(container).toMatchSnapshot();
  });
});
