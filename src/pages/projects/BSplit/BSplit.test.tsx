import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { BSplit } from './BSplit';

describe('BSplit project page', () => {
  it('renders', async () => {
    const { container } = render(
      <BrowserRouter>
        <BSplit />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
