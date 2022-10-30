import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { BookmarkLabeller } from './BookmarkLabeller';

describe('BookmarkLabeller component', () => {
  it('renders', async () => {
    const { container } = render(
      <BrowserRouter>
        <BookmarkLabeller />
      </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
