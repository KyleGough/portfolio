import { render, screen } from '@testing-library/react';
import React from 'react';

import { ContactFieldError } from './ContactFieldError';

describe('ContactFieldError component', () => {
  it('renders', async () => {
    const { container } = render(
      <ContactFieldError message="Invalid Email!" />
    );

    expect(screen.getByText('Invalid Email!')).toBeVisible();
    expect(container).toMatchSnapshot();
  });
});
