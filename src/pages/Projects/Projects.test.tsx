import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Projects } from './Projects';

describe('Projects component', () => {
  it('renders', async () => {
    const { container } = render(
      <BrowserRouter>
        <Projects />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
