import mockStaticImageData from '@mocks/mockStaticImageData';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { ImageFigure } from './ImageFigure';

describe('ImageFigure component', () => {
  it('renders', () => {
    const { container } = render(
      <ImageFigure
        image={{
          imageData: mockStaticImageData,
          alt: 'Test Caption',
        }}
      />
    );
    expect(screen.getByText('Test Caption')).toBeVisible();
    expect(container).toMatchSnapshot();
  });
});
