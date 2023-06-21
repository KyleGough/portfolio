import { render, screen } from '@testing-library/react';
import React from 'react';

import { EmailStatus } from '../Contact.types';
import { ContactSendButton } from './ContactSendButton';

describe('ContactSendButton component', () => {
  it('renders', () => {
    const { container } = render(
      <ContactSendButton onClick={() => jest.fn()} status={EmailStatus.IDLE} />
    );

    expect(screen.getByText('Send Message')).toBeVisible();
    expect(container).toMatchSnapshot();
  });

  it('component displays correct text on fail status', () => {
    render(
      <ContactSendButton onClick={() => jest.fn()} status={EmailStatus.FAIL} />
    );

    expect(screen.getByText('Message Failed')).toBeVisible();
  });

  it('component displays correct text on sent status', () => {
    render(
      <ContactSendButton onClick={() => jest.fn()} status={EmailStatus.SENT} />
    );

    expect(screen.getByText('Message Sent')).toBeVisible();
  });
});
