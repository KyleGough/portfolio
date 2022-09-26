import { render, screen } from '@testing-library/react';
import React from 'react';

import { Section } from './Section';

describe('Section component', () => {
  it('renders', async () => {
    const { container } = render(<Section>Test</Section>);
    expect(screen.getByText('Test')).toBeVisible();
    expect(container).toMatchSnapshot();
  });

  it('component overrides top padding', async () => {
    render(
      <Section id="test" overrideTopPadding={true}>
        Test
      </Section>
    );

    const section = screen.getByText('Test');
    expect(section.className.includes('first:pt-24')).toBe(false);
  });
});
