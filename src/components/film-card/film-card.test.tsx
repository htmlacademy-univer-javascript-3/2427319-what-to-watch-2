import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import filmsMock from '../../mocks/films-mock.ts';
import { AuthorizationStatus } from '../../types/authorization-status';
import { Genre } from '../../types/genre';
import { ReducerName } from '../../types/reducer-name';
import { FilmCard } from './film-card';

const mockStore = configureMockStore();
const mockFilm = filmsMock[0];

describe('FilmCard Component', () => {
  const initialState = {
    [ReducerName.Authorzation]: {
      authorizationStatus: AuthorizationStatus.Authorized,
      user: null,
    },
    [ReducerName.Film]: {
      film: mockFilm,
      reviews: [],
      similar: [],
      isLoading: false,
    },
    [ReducerName.Main]: {
      films: [mockFilm],
      genreFilms: [],
      currentGenre: Genre.DefaultGenre,
      isFilmsLoading: false,
      error: null,
      promo: mockFilm,
      favoriteFilms: [],
      favoriteCount: 0,
    },
  };

  beforeEach(() => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FilmCard film={mockFilm} />
        </MemoryRouter>
      </Provider>
    );
  });

  it('renders the film card with correct details', () => {
    expect(screen.getByText(mockFilm.name)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.genre)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.released)).toBeInTheDocument();
  });

  it('has the correct alt text for the background image', () => {
    const backgroundImageElement = screen.getByTestId('film-background-image');
    expect(backgroundImageElement).toHaveAttribute('alt', mockFilm.name);
  });
});
