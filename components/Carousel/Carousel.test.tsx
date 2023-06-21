import mockStaticImageData from '@mocks/mockStaticImageData';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { Carousel } from './Carousel';

describe('Carousel component', () => {
  it('renders', () => {
    const { container } = render(
      <Carousel backgrounds={[mockStaticImageData, mockStaticImageData]}>
        Carousel Text
      </Carousel>
    );

    expect(screen.getByText('Carousel Text')).toBeVisible();
    expect(container).toMatchSnapshot();
  });
});
