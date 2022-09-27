import { render } from '@testing-library/react';
import React from 'react';

import { mockIntersectionObserver } from '../../utilities/mockIntersectionObserver';
import { About } from './About';

describe('About page', () => {
  beforeEach(mockIntersectionObserver);

  it('renders', async () => {
    const { container } = render(<About />);
    expect(container).toMatchSnapshot();
  });
});
