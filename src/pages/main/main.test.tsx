import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import filmsMock from '../../mocks/films-mock.ts';
import { createAPI } from '../../services/api';
import { AuthorizationStatus } from '../../types/authorization-status';
import { ReducerName } from '../../types/reducer-name';
import { State } from '../../types/state';
import { Main } from './main';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State>(middlewares);

const promoFilm = filmsMock[0];

describe('MainPage Component', () => {
  it('renders Main page with promo film', async () => {
    const uniquePromoName = 'UniquePromo';
    const store = mockStore({
      [ReducerName.Main]: {
        promo: {...promoFilm, name: uniquePromoName},
        genreFilms: filmsMock,
        films: filmsMock,
        isPromoLoading: false,
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
      }
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Main />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      const promoFilmTitle = screen.getByText(promoFilm.name);
      expect(promoFilmTitle).toBeInTheDocument();

    });
  });

  it('renders loading spinner while fetching promo film', () => {
    const store = mockStore({
      [ReducerName.Main]: {
        promo: null,
        isPromoLoading: true,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Main />
        </MemoryRouter>
      </Provider>
    );

    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });
});
