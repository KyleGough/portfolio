import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Footer } from './Footer';

describe('Footer component', () => {
  it('renders', async () => {
    const { container } = render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
