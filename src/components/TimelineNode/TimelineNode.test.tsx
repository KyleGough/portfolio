import { render, screen } from '@testing-library/react';
import React from 'react';

import { mockIntersectionObserver } from '../../mocks/mockIntersectionObserver';
import { TimelineNode } from './TimelineNode';

describe('TimelineNode component', () => {
  beforeEach(mockIntersectionObserver);

  it('renders', async () => {
    const { container } = render(<TimelineNode title="CEO" company="Acme" date="January 2000 - Present" align="left" logo="#" />);
    expect(screen.getByText('CEO')).toBeVisible();
    expect(screen.getByText('Acme')).toBeVisible();
    expect(screen.getByText('January 2000 - Present')).toBeVisible();
    expect(container).toMatchSnapshot();
  });
});
