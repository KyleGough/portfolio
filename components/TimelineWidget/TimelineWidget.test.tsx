import mockIntersectionObserver from '@mocks/mockIntersectionObserver';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { TimelineWidget } from './TimelineWidget';

describe('TimelineWidget component', () => {
  beforeEach(mockIntersectionObserver);

  it('renders', () => {
    render(<TimelineWidget />);
    expect(screen.getByText('Ripjar')).toBeInTheDocument();
  });
});
