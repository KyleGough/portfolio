import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { SortingVisualiser } from './SortingVisualiser';

describe('SortingVisualiser project page', () => {
  it('renders', async () => {
    const { container } = render(
      <BrowserRouter>
        <SortingVisualiser />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
