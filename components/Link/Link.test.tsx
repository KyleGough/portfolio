import { render, screen } from '@testing-library/react';
import React from 'react';

import { Link } from './Link';

describe('Link component', () => {
  it('renders external link with security attributes', () => {
    render(<Link href="https://google.com">Link</Link>);

    const link = screen.getByRole('link', { name: 'Link' });
    expect(link).toHaveAttribute('href', 'https://google.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders internal link', () => {
    render(<Link to="/test">Link</Link>);

    expect(screen.getByRole('link')).toHaveAttribute('href', '/test');
    expect(screen.getByText('Link')).toBeVisible();
  });

  it('passes ariaLabel to internal NextLink as aria-label', () => {
    render(
      <Link ariaLabel="Custom home" to="/">
        <span>Home</span>
      </Link>,
    );

    expect(screen.getByRole('link', { name: 'Custom home' })).toHaveAttribute(
      'href',
      '/',
    );
  });
});
