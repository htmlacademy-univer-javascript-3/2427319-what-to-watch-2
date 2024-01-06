import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import thunk from 'redux-thunk';
import filmsMock from '../../mocks/films-mock.ts';
import { RouteLinks } from '../../router/consts';
import { createAPI } from '../../services/api';
import { AuthorizationStatus } from '../../types/authorization-status';

import { ReducerName } from '../../types/reducer-name';
import { State } from '../../types/state';
import { Film } from '.';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State>(middlewares);

const film = filmsMock[0];
const similar = filmsMock[1];


describe('FilmPage Component', () => {
  it('renders loading spinner while fetching film data', () => {
    const store = mockStore({
      [ReducerName.Film]: {
        film: null,
        isLoading: true,
      },
      [ReducerName.Authorzation]: {
        authorizationStatus: AuthorizationStatus.Unauthorized,
        user: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`${RouteLinks.FILMS}/1`]}>
          <Routes>
            <Route path={`${RouteLinks.FILMS}/:id`} element={<Film />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('renders 404 page when film ID is not available', () => {
    const store = mockStore({
      [ReducerName.Film]: {
        film: null,
        isLoading: false,
      },
      [ReducerName.Authorzation]: {
        authorizationStatus: AuthorizationStatus.Unauthorized,
        user: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`${RouteLinks.FILMS}/invalidID`]}>
          <Routes>
            <Route path={`${RouteLinks.FILMS}/:id`} element={<Film />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/404 Not Found/)).toBeInTheDocument();
  });

  it('renders film page with film data', async () => {
    const store = mockStore({
      [ReducerName.Film]: {
        film: film,
        isLoading: false,
        similar: [similar],
      },
      [ReducerName.Authorzation]: {
        authorizationStatus: AuthorizationStatus.Authorized,
        user: {
          name: 'John Doe',
          avatarUrl: 'path/to/avatar.jpg',
          email: 'john@example.com',
          id: 123,
          token: '123433',
        },
      },
      [ReducerName.Main]: {
        favoriteCount: 0,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`${RouteLinks.FILMS}/1`]}>
          <Routes>
            <Route path={`${RouteLinks.FILMS}/:id`} element={<Film />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      const filmTitle = screen.getByText(film.name);
      expect(filmTitle).toBeInTheDocument();
    });

    const similarFilm1 = screen.getByText(similar.name);
    expect(similarFilm1).toBeInTheDocument();
  });
});
