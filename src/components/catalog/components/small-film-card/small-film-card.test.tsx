import { configureMockStore } from '@jedmao/redux-mock-store';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import filmsMock from '../../../../mocks/films-mock.ts';
import { ReducerName } from '../../../../types/reducer-name.ts';
import { State } from '../../../../types/state.ts';
import { FilmsList } from '../films-list';
import { SmallFilmCard } from './small-film-card.tsx';

const mockFilm = filmsMock[0];

const mockStore = configureMockStore<State>([thunk]);

describe('FilmsList Component', () => {
  const onMouseEnterMock = () => true;
  const onMouseLeaveMock = () => true;

  it('handles card hover correctly in FilmsList', () => {
    const store = mockStore({
      [ReducerName.Main]: {
        genreFilms: [mockFilm],
        isFilmsLoading: false,
      },
    });

    render(
      <MemoryRouter>
        <Provider store={store}>
          <FilmsList maxLength={1} />
        </Provider>
      </MemoryRouter>
    );

    const filmCard = screen.getByTestId('sample-film-title');

    expect(filmCard).toHaveClass('small-film-card');

    fireEvent.mouseEnter(filmCard);

    expect(filmCard).toHaveAttribute('data-active', 'true');

    fireEvent.mouseLeave(filmCard);

    expect(filmCard).toHaveAttribute('data-active', 'false');
  });

  it('renders active state with VideoPlayer in SmallFilmCard', () => {
    render(
      <MemoryRouter>
        <SmallFilmCard film={mockFilm} isActive onMouseEnter={onMouseEnterMock} onMouseLeave={onMouseLeaveMock} />
      </MemoryRouter>
    );

    const filmCard = screen.getByTestId('sample-film-title');
    const videoPlayer = screen.getByTestId('video-player');

    expect(filmCard).toHaveAttribute('data-active', 'true');
    expect(videoPlayer).toBeInTheDocument();
  });

  it('renders inactive state with image in SmallFilmCard', () => {
    render(
      <MemoryRouter>
        <SmallFilmCard film={mockFilm} isActive={false} onMouseEnter={onMouseEnterMock} onMouseLeave={onMouseLeaveMock} />
      </MemoryRouter>
    );

    const filmCard = screen.getByTestId('sample-film-title');
    const image = screen.getByAltText('Snatch');

    expect(filmCard).toHaveAttribute('data-active', 'false');
    expect(image).toBeInTheDocument();
  });
});
