import mockIntersectionObserver from '@mocks/mockIntersectionObserver';
import mockStaticImageData from '@mocks/mockStaticImageData';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { TimelineNode } from './TimelineNode';

describe('TimelineNode component', () => {
  beforeEach(mockIntersectionObserver);

  it('renders', () => {
    const { container } = render(
      <TimelineNode
        title="Acme"
        subtitle="CEO"
        date="January 2000 - Present"
        align="left"
        logo={mockStaticImageData}
      />
    );
    expect(screen.getByText('CEO')).toBeVisible();
    expect(screen.getByText('Acme')).toBeVisible();
    expect(screen.getByText('January 2000 - Present')).toBeVisible();
    expect(container).toMatchSnapshot();
  });
});
