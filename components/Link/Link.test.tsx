import { render, screen } from '@testing-library/react';
import React from 'react';

import { Link } from './Link';

describe('Link component', () => {
  it('renders external link', () => {
    const { container } = render(<Link href="https://google.com">Link</Link>);

    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      'https://google.com'
    );
    expect(screen.getByText('Link')).toBeVisible();
    expect(container).toMatchSnapshot();
  });

  it('renders internal link', () => {
    render(<Link to="/test">Link</Link>);

    expect(screen.getByRole('link')).toHaveAttribute('href', '/test');
    expect(screen.getByText('Link')).toBeVisible();
  });
});
