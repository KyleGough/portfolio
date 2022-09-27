import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { RollerCoaster } from './RollerCoaster';

describe('RollerCoaster project page', () => {
  it('renders', async () => {
    const { container } = render(
      <BrowserRouter>
        <RollerCoaster />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
