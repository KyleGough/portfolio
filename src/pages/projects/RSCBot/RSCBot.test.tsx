import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { RSCBot } from './RSCBot';

describe('RSCBot project page', () => {
  it('renders', async () => {
    const { container } = render(
      <BrowserRouter>
        <RSCBot />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
