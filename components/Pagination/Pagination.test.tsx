import { render } from '@testing-library/react';
import React from 'react';

import { Pagination } from './Pagination';

describe('Pagination component', () => {
  it('renders', () => {
    const { container } = render(
      <Pagination
        previousTitle="Sorting Algorithm Visualiser"
        previousLink="/projects/sorting-algorithm-visualiser"
        nextTitle="To Do List"
        nextLink="/projects/todo-list"
      />
    );

    expect(container).toMatchSnapshot();
  });
});
