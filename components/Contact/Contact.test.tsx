import mockIntersectionObserver from '@mocks/mockIntersectionObserver';
import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { Contact } from './Contact';

const MESSAGE_METER_TEST_ID = 'contact-form-message-meter';

describe('Contact component', () => {
  beforeEach(() => {
    mockIntersectionObserver();
    global.fetch = jest.fn();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('shows message character count and updates when typing', () => {
    render(<Contact />);
    const message = screen.getByTestId('contact-form-message');
    expect(screen.getByTestId(MESSAGE_METER_TEST_ID)).toHaveTextContent('0');
    expect(screen.getByTestId(MESSAGE_METER_TEST_ID)).toHaveTextContent('1024');
    act(() => {
      fireEvent.change(message, { target: { value: 'hello' } });
    });
    expect(screen.getByTestId(MESSAGE_METER_TEST_ID)).toHaveTextContent('5');
  });

  it('contact form shows errors when required fields are empty', () => {
    render(<Contact />);

    // Send message.
    const sendBtn = screen.getByRole('button');
    act(() => {
      fireEvent.click(sendBtn);
    });

    // All 3 fields should show required error.
    expect(screen.getAllByText('Required!')).toHaveLength(3);

    // Email API should not have been called.
    expect(global.fetch).toHaveBeenCalledTimes(0);
  });

  it('contact form shows error when given invalid email', () => {
    render(<Contact />);

    // Update email field.
    const emailField = screen.getByTestId('contact-form-email');
    act(() => {
      fireEvent.change(emailField, { target: { value: 'foo' } });
    });

    // Send message.
    const sendBtn = screen.getByRole('button');
    act(() => {
      fireEvent.click(sendBtn);
    });

    // Email field should show invalid email error.
    expect(screen.getByText('Invalid Email!')).toBeVisible();

    // Name and message fields should show required error.
    expect(screen.getAllByText('Required!')).toHaveLength(2);

    // Email API should not have been called.
    expect(global.fetch).toHaveBeenCalledTimes(0);
  });

  it('contact form submits on valid inputs', () => {
    // Pending promise: we only assert fetch was invoked; no async state flush needed.
    (global.fetch as jest.Mock).mockReturnValue(
      new Promise<never>(() => undefined)
    );

    render(<Contact />);

    const nameField = screen.getByTestId('contact-form-name');
    const emailField = screen.getByTestId('contact-form-email');
    const messageField = screen.getByTestId('contact-form-message');

    // Update all form fields.
    act(() => {
      fireEvent.change(nameField, { target: { value: 'Kyle Gough' } });
    });

    act(() => {
      fireEvent.change(emailField, {
        target: { value: 'foo.bar@baz.com' },
      });
    });

    act(() => {
      fireEvent.change(messageField, {
        target: { value: 'Custom Message' },
      });
    });

    // Send message.
    const sendBtn = screen.getByRole('button');
    act(() => {
      fireEvent.click(sendBtn);
    });

    // Email API should have been called.
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('/api/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Kyle Gough',
        email: 'foo.bar@baz.com',
        message: 'Custom Message',
      }),
    });
  });
});
