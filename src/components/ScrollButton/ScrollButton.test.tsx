import { render, screen } from '@testing-library/react';
import React from 'react';

import { ScrollButton } from './ScrollButton';

describe('ScrollButton component', () => {
  it('renders', async () => {
    const { container } = render(
      <ScrollButton onClick={() => jest.fn()}>Test</ScrollButton>
    );
    expect(screen.getByText('Test')).toBeVisible();
    expect(container).toMatchSnapshot();
  });
});
