import { fireEvent, render, screen } from '@testing-library/react';
import axios from 'axios';
import React from 'react';

import { mockIntersectionObserver } from '../../utilities/mockIntersectionObserver';
import { Contact } from './Contact';
import { validateEmail } from './Contact.helper';

const validEmails = [
  '',
  'foo@bar.com',
  'foo.bar@baz.co.uk',
  'jane@doe.test.gov',
  'foo+bar@email.xyz',
  'john-smith@baz.com',
  'foo@bar-qux.io',
];

const invalidEmails = [
  'foobar',
  '#$%^&*(*&)',
  '@test.com',
  'apple.banana.com',
  '.jane@doe.co.uk',
  'foo..bar@baz.net',
  '@',
];

describe('Contact component', () => {
  beforeEach(mockIntersectionObserver);

  it('renders', async () => {
    const { container } = render(<Contact />);
    expect(container).toMatchSnapshot();
  });

  it('validateEmail indentifies valid emails successfully', async () => {
    for (const email of validEmails) {
      expect(validateEmail(email)).toBe(true);
    }

    for (const email of invalidEmails) {
      expect(validateEmail(email)).toBe(false);
    }
  });

  it('contact from gives errors when required fields are empty', async () => {
    const spy = jest.spyOn(axios, 'post');
    render(<Contact />);

    // On form submit, all 3 fields show required error.
    const submitBtn = screen.getByRole('button');
    fireEvent.click(submitBtn);
    expect(screen.getAllByText('Required!')).toHaveLength(3);

    // Email API should not have been called.
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('contact from gives error when given invalid email', async () => {
    const spy = jest.spyOn(axios, 'post');
    render(<Contact />);

    // Update email field.
    const emailField = screen.getByPlaceholderText('Your email here');
    fireEvent.change(emailField, { target: { value: 'foo' } });

    const submitBtn = screen.getByRole('button');
    fireEvent.click(submitBtn);

    // Email field should show invalid email error.
    expect(screen.getByText('Invalid Email!')).toBeVisible();

    // Name and message fields should show required error.
    expect(screen.getAllByText('Required!')).toHaveLength(2);

    // Email API should not have been called.
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('contact form submits on valid inputs', async () => {
    const a = jest
      .spyOn(axios, 'post')
      .mockReturnValue(Promise.resolve(() => jest.fn()));

    render(<Contact />);

    // Update name field.
    const nameField = screen.getByPlaceholderText('Your name here');
    fireEvent.change(nameField, { target: { value: 'Kyle Gough' } });

    // Update email field.
    const emailField = screen.getByPlaceholderText('Your email here');
    fireEvent.change(emailField, {
      target: { value: 'foo.bar@baz.com' },
    });

    // Update message field.
    const messageField = screen.getByPlaceholderText('Enter your message');
    fireEvent.change(messageField, {
      target: { value: 'Custom Message' },
    });

    const submitBtn = screen.getByRole('button');
    fireEvent.click(submitBtn);

    // Email API should not have been called.
    expect(a).toHaveBeenCalledTimes(1);
    expect(a).toHaveBeenCalledWith('/api/sendMessage', {
      name: 'Kyle Gough',
      email: 'foo.bar@baz.com',
      message: 'Custom Message',
    });
  });
});
