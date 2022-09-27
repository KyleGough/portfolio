import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { GraphVisualiser } from './GraphVisualiser';

describe('GraphVisualiser project page', () => {
  it('renders', async () => {
    const { container } = render(
      <BrowserRouter>
        <GraphVisualiser />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
