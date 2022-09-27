import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { mockIntersectionObserver } from '../../utilities/mockIntersectionObserver';
import { Home } from './Home';

describe('Home component', () => {
  beforeEach(mockIntersectionObserver);

  it('renders', async () => {
    const { container } = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
