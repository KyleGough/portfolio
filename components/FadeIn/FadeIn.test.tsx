import mockIntersectionObserver from '@mocks/mockIntersectionObserver';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { FadeIn } from './FadeIn';

describe('FadeIn component', () => {
  beforeEach(mockIntersectionObserver);
  it('renders', () => {
    const { container } = render(<FadeIn>Test</FadeIn>);

    expect(screen.getByText('Test')).toBeVisible();
    expect(container).toMatchSnapshot();
  });
});
