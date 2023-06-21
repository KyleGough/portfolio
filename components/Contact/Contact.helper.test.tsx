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

describe('Contact helper', () => {
  it('validateEmail indentifies valid emails successfully', () => {
    for (const email of validEmails) {
      expect(validateEmail(email)).toBe(true);
    }

    for (const email of invalidEmails) {
      expect(validateEmail(email)).toBe(false);
    }
  });
});
