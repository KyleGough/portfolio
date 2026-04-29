import mockStaticImageData from '@mocks/mockStaticImageData';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { ImageModal } from './ImageModal';

describe('ImageModal component', () => {
  it('dialog opens and closes on click', () => {
    render(<ImageModal image={mockStaticImageData} alt="Test Caption" />);
    expect(screen.getByText('Test Caption')).toBeVisible();

    // Modal should not be in the document by default.
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    // Modal opens on thumbnail (button) activation.
    fireEvent.click(
      screen.getByRole('button', { name: 'View larger version: Test Caption' })
    );
    expect(screen.queryByRole('dialog')).toBeInTheDocument();

    // Modal closes upon click event.
    const dialog = screen.getByRole('dialog');
    fireEvent.click(dialog);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
