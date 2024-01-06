import { configureMockStore } from '@jedmao/redux-mock-store';
import { ThunkDispatch, Action } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import thunk from 'redux-thunk';
import filmsMock from '../../mocks/films-mock.ts';
import { RouteLinks } from '../../router/consts';
import { createAPI } from '../../services/api';
import { AuthorizationStatus } from '../../types/authorization-status';
import { ReducerName } from '../../types/reducer-name';
import { State } from '../../types/state';
import { AddReview } from './add-review';


const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
>(middlewares);

describe('AddReviewPage Component', () => {
  it('renders loading spinner while fetching film data', () => {
    const store = mockStore({
      [ReducerName.Film]: {
        film: null,
        isLoading: true,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`${RouteLinks.FILMS}/1/review`]}>
          <Routes>
            <Route path={`${RouteLinks.FILMS}/:id/review`} element={<AddReview />} />
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
        <MemoryRouter initialEntries={[`${RouteLinks.FILMS}/invalidID/review`]}>
          <Routes>
            <Route path={`${RouteLinks.FILMS}/:id/review`} element={<AddReview />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/404 Not Found/)).toBeInTheDocument();

  });

  it('renders add review page with film data', () => {
    const user = {
      name: 'John Doe',
      avatarUrl: 'path/to/avatar.jpg',
      email: 'john@example.com',
      id: 123,
      token: '123433',
    };
    const store = mockStore({
      [ReducerName.Film]: {
        film: filmsMock[0],
        isLoading: false,
      },
      [ReducerName.Authorzation]: {
        authorizationStatus: AuthorizationStatus.Authorized,
        user: user,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`${RouteLinks.FILMS}/1/review`]}>
          <Routes>
            <Route path={`${RouteLinks.FILMS}/:id/review`} element={<AddReview />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const addReviewForm = screen.getByText(/Add review/);
    expect(addReviewForm).toBeInTheDocument();
  });
});
