import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Minesweeper } from './Minesweeper';

describe('Minesweeper project page', () => {
  it('renders', async () => {
    const { container } = render(
      <BrowserRouter>
        <Minesweeper />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
