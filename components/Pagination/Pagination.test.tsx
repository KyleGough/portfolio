import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Pagination } from './Pagination';

describe('Pagination component', () => {
  it('renders', async () => {
    const { container } = render(
      <BrowserRouter>
        <Pagination
          previousTitle="Sorting Algorithm Visualiser"
          previousLink="/projects/sorting-algorithm-visualiser"
          nextTitle="To Do List"
          nextLink="/projects/todo-list"
        />
      </BrowserRouter>
    );

    expect(container).toMatchSnapshot();
  });
});
