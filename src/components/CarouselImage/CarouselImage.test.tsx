import { render } from '@testing-library/react';
import React from 'react';

import { CarouselImage } from './CarouselImage';

describe('CarouselImage component', () => {
  it('renders', async () => {
    const { container } = render(<CarouselImage show={true} bg="bg-header1" />);
    expect(container).toMatchSnapshot();
  });
});
