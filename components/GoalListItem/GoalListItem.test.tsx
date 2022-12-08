import { render, screen } from '@testing-library/react';
import React from 'react';

import { GoalListItem } from './GoalListItem';

describe('GoalListItem component', () => {
  it('renders', async () => {
    const { container } = render(<GoalListItem name="ESLint" />);

    expect(screen.getByText('ESLint')).toBeVisible();
    expect(container).toMatchSnapshot();
  });
});
