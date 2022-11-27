import { mockIntersectionObserver } from '@mocks/mockIntersectionObserver';
import { act, fireEvent, render, screen } from '@testing-library/react';
import axios from 'axios';
import React from 'react';

import { Contact } from './Contact';

describe('Contact component', () => {
  beforeEach(mockIntersectionObserver);

  it('renders', async () => {
    const { container } = render(<Contact />);
    expect(container).toMatchSnapshot();
  });

  it('contact from gives errors when required fields are empty', async () => {
    const spy = jest.spyOn(axios, 'post');
    render(<Contact />);

    // Send message.
    const sendBtn = screen.getByRole('button');
    act(() => {
      fireEvent.click(sendBtn);
    });

    // All 3 fields should show required error.
    expect(screen.getAllByText('Required!')).toHaveLength(3);

    // Email API should not have been called.
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('contact from gives error when given invalid email', async () => {
    const spy = jest.spyOn(axios, 'post');
    render(<Contact />);

    // Update email field.
    const emailField = screen.getByPlaceholderText('Your email here');
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
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('contact form submits on valid inputs', async () => {
    const axiosMock = jest
      .spyOn(axios, 'post')
      .mockReturnValue(Promise.reject(() => jest.fn().mockReturnValue('test')));

    render(<Contact />);

    const nameField = screen.getByPlaceholderText('Your name here');
    const emailField = screen.getByPlaceholderText('Your email here');
    const messageField = screen.getByPlaceholderText('Enter your message');

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
    await act(async () => {
      fireEvent.click(sendBtn);
    });

    // Email API should have been called.
    expect(axiosMock).toHaveBeenCalledTimes(1);
    expect(axiosMock).toHaveBeenCalledWith('/api/sendMessage', {
      name: 'Kyle Gough',
      email: 'foo.bar@baz.com',
      message: 'Custom Message',
    });
  });
});
