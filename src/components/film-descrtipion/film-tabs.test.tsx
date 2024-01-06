import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import filmsMock from '../../mocks/films-mock.ts';
import { ReducerName } from '../../types/reducer-name';
import { TabTypes } from '../../types/tabs';
import { FilmTabs } from './film-tabs.tsx';

const mockStore = configureMockStore();
const mockFilm = filmsMock[0];

describe('FilmTabs Component', () => {
  beforeEach(() => {
    const store = mockStore({
      [ReducerName.Film]: {
        film: mockFilm,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FilmTabs film={mockFilm} />
        </MemoryRouter>
      </Provider>
    );
  });

  it('renders all tabs and the default panel', () => {
    const tabs = Object.values(TabTypes);

    tabs.forEach((tab) => {
      expect(screen.getByText(tab)).toBeInTheDocument();
    });
  });
});
