import mockIntersectionObserver from '@mocks/mockIntersectionObserver';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { SkillItem } from './SkillItem';

const skill = {
  name: 'React',
  description: 'Portfolio, LucidLab, Minesweeper',
  logo: '/#logo',
};

describe('SkillItem component', () => {
  beforeEach(mockIntersectionObserver);

  it('renders', () => {
    const { container } = render(<SkillItem {...skill} />);

    expect(screen.getByText('React')).toBeVisible();
    expect(screen.getByText('Portfolio, LucidLab, Minesweeper')).toBeVisible();
    expect(container).toMatchSnapshot();
  });
});
