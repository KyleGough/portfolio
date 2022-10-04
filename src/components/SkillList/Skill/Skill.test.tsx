import { render, screen } from '@testing-library/react';
import React from 'react';

import { mockIntersectionObserver } from '../../../mocks/mockIntersectionObserver';
import { Skill } from './Skill';

const skill = {
  type: 'progress-web',
  progress: 75,
  progressClass: 'w-[75%]',
  name: 'React',
  description: 'Portfolio, LucidLab, Minesweeper',
  logo: '/#logo',
};

describe('Skill component', () => {
  beforeEach(mockIntersectionObserver);

  it('renders', async () => {
    const { container } = render(<Skill {...skill} />);

    expect(screen.getByText('React')).toBeVisible();
    expect(screen.getByText('Portfolio, LucidLab, Minesweeper')).toBeVisible();
    expect(container).toMatchSnapshot();
  });
});
