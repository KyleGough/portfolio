import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { LucidLab } from './LucidLab';

describe('LucidLab project page', () => {
  it('renders', async () => {
    const { container } = render(
      <BrowserRouter>
        <LucidLab />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
