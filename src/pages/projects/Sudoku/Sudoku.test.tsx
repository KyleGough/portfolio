import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Sudoku } from './Sudoku';

describe('Sudoku project page', () => {
  it('renders', async () => {
    const { container } = render(
      <BrowserRouter>
        <Sudoku />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
