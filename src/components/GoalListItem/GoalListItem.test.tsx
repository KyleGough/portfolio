import { render, screen } from '@testing-library/react';
import React from 'react';

import { GoalListItem, Progress } from './GoalListItem';

describe('GoalListItem component', () => {
  it('renders', async () => {
    const { container } = render(
      <GoalListItem name="Docker" progress={Progress.AMBER} />
    );

    expect(screen.getByText('Docker')).toBeVisible();
    expect(container).toMatchSnapshot();
  });

  it('component has corresponding progress class', async () => {
    render(<GoalListItem name="Jest" progress={Progress.RED} />);

    // Expect component to have appropriate colour corresponding to progress.
    const listItem = screen.getByRole('listitem');
    expect(listItem.className.includes(Progress.RED)).toBe(true);
  });
});
