import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Portfolio } from './Portfolio';

describe('Portfolio project page', () => {
  it('renders', async () => {
    const { container } = render(
      <BrowserRouter>
        <Portfolio />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
