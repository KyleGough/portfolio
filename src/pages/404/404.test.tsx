import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { NotFound } from './404';

describe('NotFound page', () => {
  it('renders', async () => {
    const { container } = render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
