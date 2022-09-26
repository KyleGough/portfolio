import { render, screen } from '@testing-library/react';
import React from 'react';

import { Screenshots } from './Screenshots';

describe('Screenshots component', () => {
  it('renders', async () => {
    const { container } = render(
      <Screenshots
        images={[
          { src: '/#', caption: 'Image A' },
          { src: '/#', caption: 'Image B' },
        ]}
      />
    );

    expect(screen.getByText('Image A')).toBeVisible();
    expect(screen.getByText('Image B')).toBeVisible();
    expect(container).toMatchSnapshot();
  });
});
