import { render, screen } from '@testing-library/react';
import React from 'react';

import { ImageFigure } from './ImageFigure';

describe('ImageFigure component', () => {
  it('renders', async () => {
    const { container } = render(
      <ImageFigure image={{ src: '/#', alt: 'Test Caption' }} />
    );
    expect(screen.getByText('Test Caption')).toBeVisible();
    expect(container).toMatchSnapshot();
  });
});
