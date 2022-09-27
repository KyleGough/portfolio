import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { CaveExploration } from './CaveExploration';

describe('CaveExploration project page', () => {
  it('renders', async () => {
    const { container } = render(
      <BrowserRouter>
        <CaveExploration />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
