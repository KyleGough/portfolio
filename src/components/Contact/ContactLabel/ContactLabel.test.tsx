import { render, screen } from '@testing-library/react';
import React from 'react';

import { ContactLabel } from './ContactLabel';

describe('ContactLabel component', () => {
  it('renders', async () => {
    const { container } = render(
      <ContactLabel valid={true} htmlFor="email">
        Email
      </ContactLabel>
    );
    expect(container).toMatchSnapshot();
  });

  it('component has link colours if valid', async () => {
    render(
      <ContactLabel valid={true} htmlFor="email">
        Email
      </ContactLabel>
    );

    const label = screen.getByText('Email');
    expect(label).toBeVisible();
    expect(label.className.includes('text-link')).toBe(true);
  });

  it('component has error colours if invalid', async () => {
    render(
      <ContactLabel valid={false} htmlFor="name">
        Name
      </ContactLabel>
    );

    const label = screen.getByText('Name');
    expect(label).toBeVisible();
    expect(label.className.includes('text-error')).toBe(true);
  });
});
