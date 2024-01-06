import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { Genre } from '../../../../types/genre';
import { ReducerName } from '../../../../types/reducer-name';
import { GenreList } from './genre-list';

const mockStore = configureMockStore([thunk]);

const mockFilms = [
  { id: 1, genre: 'Action' },
  { id: 2, genre: 'Drama' },
  { id: 3, genre: 'Comedy' },
];

const initialState = {
  [ReducerName.Main]: {
    currentGenre: Genre.DefaultGenre,
    films: mockFilms,
  },
};

describe('GenreList Component', () => {
  it('renders all unique genres from genreList', () => {
    const store = mockStore(initialState);

    render(
      <MemoryRouter>
        <Provider store={store}>
          <GenreList />
        </Provider>
      </MemoryRouter>
    );

    const genres = screen.getAllByRole('listitem');
    // Expecting 'Action', 'Drama', 'Comedy', and possibly 'All genres'
    expect(genres.length).toBeGreaterThanOrEqual(3);
  });
});
