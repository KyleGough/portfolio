import mockIntersectionObserver from '@mocks/mockIntersectionObserver';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { TelemetryHeading } from './TelemetryHeading';

const mockMatchMedia = (): void => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
};

describe('TelemetryHeading', () => {
  beforeEach(() => {
    mockIntersectionObserver();
    mockMatchMedia();
  });

  it('renders the title and optional kicker for assistive tech', () => {
    render(
      <TelemetryHeading
        id="case-studies"
        kicker="Selected"
        title="Case Studies"
      />,
    );

    expect(screen.getByRole('heading', { name: 'Case Studies' })).toHaveAttribute(
      'id',
      'case-studies',
    );
    expect(screen.getByLabelText('Selected')).toBeInTheDocument();
  });

  it('renders without a kicker', () => {
    render(<TelemetryHeading title="Work Experience" variant="section" />);
    expect(
      screen.getByRole('heading', { name: 'Work Experience' }),
    ).toBeVisible();
  });
});
