import { render } from '@testing-library/react';
import React from 'react';

import { Divider } from './Divider';

describe('Divider component', () => {
  it('renders', () => {
    const { container } = render(<Divider />);
    expect(container).toMatchSnapshot();
  });
});
