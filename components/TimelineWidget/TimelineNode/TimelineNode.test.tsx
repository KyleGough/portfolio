import mockIntersectionObserver from '@mocks/mockIntersectionObserver';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { TimelineNode } from './TimelineNode';

describe('TimelineNode component', () => {
  beforeEach(mockIntersectionObserver);

  it('renders', async () => {
    const { container } = render(
      <TimelineNode
        title="Acme"
        subtitle="CEO"
        date="January 2000 - Present"
        align="left"
        logo={{ src: '/#logo', width: 100, height: 100 }}
      />
    );
    expect(screen.getByText('CEO')).toBeVisible();
    expect(screen.getByText('Acme')).toBeVisible();
    expect(screen.getByText('January 2000 - Present')).toBeVisible();
    expect(container).toMatchSnapshot();
  });
});
