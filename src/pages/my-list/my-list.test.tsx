import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import thunk from 'redux-thunk';
import filmsMock from '../../mocks/films-mock.ts';
import { createAPI } from '../../services/api';
import { AuthorizationStatus } from '../../types/authorization-status';
import { ReducerName } from '../../types/reducer-name';
import { State } from '../../types/state';
import { MyList } from './my-list';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State>(middlewares);

const film = filmsMock[0];


describe('MyListPage Component', () => {
  it('renders My List page with favorite films', async () => {
    const store = mockStore({
      [ReducerName.Main]: {
        favoriteFilms: [film],
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
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Routes>
            <Route path='*' element={<MyList />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      const myListTitle = screen.getByText(/My list/);
      expect(myListTitle).toBeInTheDocument();

      const filmCount = screen.getByTestId('favorite-count');
      expect(filmCount).toHaveTextContent(String(1));

      const filmTitle = screen.getByText(film.name);
      expect(filmTitle).toBeInTheDocument();
    });
  });
});
