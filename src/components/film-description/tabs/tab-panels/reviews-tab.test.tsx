import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { ReducerName } from '../../../../types/reducer-name.ts';
import { ReviewsTab } from './reviews-tab.tsx';

const mockStore = configureMockStore();

describe('Reviews Component', () => {
  it('should render reviews when there are reviews available', () => {
    const reviews = [
      { id: '1', comment: 'Great movie!', user: 'John Doe', date: '2023-11-01', rating: 5 },
    ];

    const store = mockStore({
      [ReducerName.Film]: { reviews },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ReviewsTab />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(reviews[0].comment)).toBeInTheDocument();
  });

  it('should render a message when there are no reviews', () => {
    const store = mockStore({
      [ReducerName.Film]: { reviews: [] },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ReviewsTab />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Комментариев еще нет...')).toBeInTheDocument();
  });
});
