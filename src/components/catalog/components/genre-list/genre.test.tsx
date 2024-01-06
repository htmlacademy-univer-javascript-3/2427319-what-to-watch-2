import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { setGenre } from '../../../../store/actions';
import { ReducerName } from '../../../../types/reducer-name';
import { Genre } from './genre';

const mockStore = configureMockStore([thunk]);

describe('Genre Component', () => {
  it('renders correctly', () => {
    const store = mockStore({
      [ReducerName.Main]: {
        currentGenre: 'Action',
      },
    });

    render(
      <MemoryRouter>
        <Provider store={store}>
          <Genre genre="Action" isActive={false} />
        </Provider>
      </MemoryRouter>
    );

    const genreLink = screen.getByText('Action');
    expect(genreLink).toBeInTheDocument();
  });

  it('handles click correctly', () => {
    const store = mockStore({
      [ReducerName.Main]: {
        currentGenre: 'Drama',
      },
    });

    render(
      <MemoryRouter>
        <Provider store={store}>
          <Genre genre="Drama" isActive={false} />
        </Provider>
      </MemoryRouter>
    );

    const genreLink = screen.getByText('Drama');
    fireEvent.click(genreLink);

    const actions = store.getActions();
    expect(actions).toContainEqual(setGenre('Drama'));
  });

  it('has active class if isActive is true', () => {
    const store = mockStore({
      [ReducerName.Main]: {
        currentGenre: 'Comedy',
      },
    });

    render(
      <MemoryRouter>
        <Provider store={store}>
          <Genre genre="Comedy" isActive />
        </Provider>
      </MemoryRouter>
    );

    const genreItem = screen.getByText('Comedy').closest('li');
    expect(genreItem).toHaveClass('catalog__genres-item--active');
  });
});
