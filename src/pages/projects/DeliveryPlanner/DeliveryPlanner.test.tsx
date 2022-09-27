import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { DeliveryPlanner } from './DeliveryPlanner';

describe('DeliveryPlanner project page', () => {
  it('renders', async () => {
    const { container } = render(
      <BrowserRouter>
        <DeliveryPlanner />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
