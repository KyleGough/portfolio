import mockStaticImageData from '@mocks/mockStaticImageData';
import { render } from '@testing-library/react';
import React from 'react';

import { CarouselImage } from './CarouselImage';

describe('CarouselImage component', () => {
  it('renders', () => {
    const { container } = render(
      <CarouselImage show={true} bg={mockStaticImageData} />
    );
    expect(container).toMatchSnapshot();
  });
});
