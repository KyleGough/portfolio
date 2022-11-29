import mockStaticImageData from '@mocks/mockStaticImageData';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { Screenshots } from './Screenshots';

describe('Screenshots component', () => {
  it('renders', async () => {
    const { container } = render(
      <Screenshots
        images={[
          { imageData: mockStaticImageData, alt: 'Image A' },
          { imageData: mockStaticImageData, alt: 'Image B' },
        ]}
      />
    );

    expect(screen.getByText('Image A')).toBeVisible();
    expect(screen.getByText('Image B')).toBeVisible();
    expect(container).toMatchSnapshot();
  });
});
