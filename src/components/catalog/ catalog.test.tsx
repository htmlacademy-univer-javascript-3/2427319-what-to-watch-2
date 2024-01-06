import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import filmsMock from '../../mocks/films-mock.ts';
import { Genre } from '../../types/genre';
import { ReducerName } from '../../types/reducer-name';
import { State } from '../../types/state';
import { Catalog } from './catalog';

const mockFilm = filmsMock[0];
const mockStore = configureMockStore<State>([thunk]);

describe('Catalog Component', () => {
  it('should render without errors', () => {
    const store = mockStore({
      [ReducerName.Main]: {
        genreFilms: [mockFilm],
        isFilmsLoading: false,
        films: filmsMock,
        currentGenre: Genre.DefaultGenre,
      },
    });

    render(
      <MemoryRouter>
        <Provider store={store}>
          <Catalog />
        </Provider>
      </MemoryRouter>
    );

    const filmsList = screen.getByTestId('films-list');
    expect(filmsList).toBeInTheDocument();
  });

  it('should handle "Show more" button click', () => {
    const store = mockStore({
      [ReducerName.Main]: {
        genreFilms: filmsMock,
        isFilmsLoading: false,
        films: filmsMock,
        currentGenre: Genre.DefaultGenre,
      },
    });

    render(
      <MemoryRouter>
        <Provider store={store}>
          <Catalog />
        </Provider>
      </MemoryRouter>
    );

    const showMoreButton = screen.getByTestId('show-more');

    fireEvent.click(showMoreButton);

    const filmsList = screen.getByTestId('films-list');
    expect(filmsList.children.length).toBe(16);
  });
});
