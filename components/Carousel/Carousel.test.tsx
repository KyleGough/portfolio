import { render, screen } from '@testing-library/react';
import React from 'react';

import { Carousel } from './Carousel';

describe('Carousel component', () => {
  it('renders', async () => {
    const { container } = render(
      <Carousel backgrounds={['bg-1', 'bg-2']}>Carousel Text</Carousel>
    );

    expect(screen.getByText('Carousel Text')).toBeVisible();
    expect(container).toMatchSnapshot();
  });
});
