import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { URLShortener } from './URLShortener';

describe('URLShortener project page', () => {
  it('renders', async () => {
    const { container } = render(
      <BrowserRouter>
        <URLShortener />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
