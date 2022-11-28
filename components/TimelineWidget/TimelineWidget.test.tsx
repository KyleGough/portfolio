import { mockIntersectionObserver } from '@mocks/mockIntersectionObserver';
import { render } from '@testing-library/react';
import React from 'react';

import { TimelineWidget } from './TimelineWidget';

describe('TimelineWidget component', () => {
  beforeEach(mockIntersectionObserver);

  it('renders', async () => {
    const { container } = render(<TimelineWidget />);
    expect(container).toMatchSnapshot();
  });
});
