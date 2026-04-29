import { render, screen } from '@testing-library/react';
import React from 'react';

import { VideoFigure } from './VideoFigure';

describe('VideoFigure component', () => {
  it('renders', () => {
    render(<VideoFigure src="/#" caption="Test Caption" />);
    expect(screen.getByText('Test Caption')).toBeVisible();
  });
});
