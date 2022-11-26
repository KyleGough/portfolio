import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { ImageModal } from './ImageModal';

describe('ImageModal component', () => {
  it('renders', async () => {
    const { container } = render(
      <ImageModal src="/#" caption="Test Caption" />
    );
    expect(screen.getByText('Test Caption')).toBeVisible();
    expect(container).toMatchSnapshot();
  });

  it('dialog opens and closes on click', async () => {
    render(<ImageModal src="/#" caption="Test Caption" />);
    expect(screen.getByText('Test Caption')).toBeVisible();

    // Modal should not be in the document by default.
    const img = screen.getByRole('img');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    // Modal opens upon click event.
    fireEvent.click(img);
    expect(screen.queryByRole('dialog')).toBeInTheDocument();

    // Modal closes upon click event.
    const dialog = screen.getByRole('dialog');
    fireEvent.click(dialog);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
