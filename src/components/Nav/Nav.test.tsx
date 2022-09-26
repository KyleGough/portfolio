import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Nav } from './Nav';

describe('Nav component', () => {
  it('renders', async () => {
    const { container } = render(
      <BrowserRouter>
        <Nav />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
