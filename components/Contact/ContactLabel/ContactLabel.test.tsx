import { render, screen } from '@testing-library/react';
import React from 'react';

import { ContactLabel } from './ContactLabel';

describe('ContactLabel component', () => {
  it('renders', () => {
    const { container } = render(
      <ContactLabel isSent={true} valid={true} htmlFor="email">
        Email
      </ContactLabel>
    );
    expect(container).toMatchSnapshot();
  });

  it('component has link colours if valid', () => {
    render(
      <ContactLabel isSent={false} valid={true} htmlFor="email">
        Email
      </ContactLabel>
    );

    const label = screen.getByText('Email');
    expect(label).toBeVisible();
    expect(label.className.includes('text-link')).toBe(true);
  });

  it('component has error colours if invalid', () => {
    render(
      <ContactLabel isSent={false} valid={false} htmlFor="name">
        Name
      </ContactLabel>
    );

    const label = screen.getByText('Name');
    expect(label).toBeVisible();
    expect(label.className.includes('text-error')).toBe(true);
  });
});
