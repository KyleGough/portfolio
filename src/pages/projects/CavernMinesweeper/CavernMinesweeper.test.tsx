import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { CavernMinesweeper } from './CavernMinesweeper';

describe('CavernMinesweeper project page', () => {
  it('renders', async () => {
    const { container } = render(
      <BrowserRouter>
        <CavernMinesweeper />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
