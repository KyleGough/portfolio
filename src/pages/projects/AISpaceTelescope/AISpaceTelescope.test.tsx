import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AISpaceTelescope } from './AISpaceTelescope';

describe('AISpaceTelescope component', () => {
  it('renders', async () => {
    const { container } = render(
      <BrowserRouter>
        <AISpaceTelescope />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
