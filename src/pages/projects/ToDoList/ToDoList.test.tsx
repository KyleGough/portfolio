import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ToDoList } from './ToDoList';

describe('ToDoList project page', () => {
  it('renders', async () => {
    const { container } = render(
      <BrowserRouter>
        <ToDoList />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
