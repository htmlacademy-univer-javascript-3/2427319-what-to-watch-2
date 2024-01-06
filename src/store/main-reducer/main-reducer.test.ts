import filmsMock from '../../mocks/films-mock.ts';
import { Genre } from '../../types/genre';
import { MainReducerState } from '../../types/main-reducer-state';
import { setGenre, setError } from '../actions';
import { fetchFilms, fetchFavoriteFilms, fetchPromo } from '../api-actions';
import { mainReducer } from './main-reducer';

const mockFilm = filmsMock[0];
const mockFilms = filmsMock;

describe('main-reducer', () => {
  let state: MainReducerState;

  beforeEach(() => {
    state = {
      promo: null,
      favoriteFilms: [],
      genreFilms: [],
      currentGenre: Genre.DefaultGenre,
      isFilmsLoading: false,
      isPromoLoading: false,
      error: null,
      films: [],
      favoriteCount: 0
    };
  });

  it('returns initial state for unknown action', () => {
    expect(mainReducer.reducer(void 0, { type: 'VERY_UNKNOWN_ACTION' }))
      .toEqual({
        promo: null,
        favoriteFilms: [],
        genreFilms: [],
        currentGenre: Genre.DefaultGenre,
        isFilmsLoading: false,
        error: null,
        isPromoLoading: false,
        films: [],
        favoriteCount: 0
      });
  });

  describe('setGenre test', () => {
    it('updates current genre', () => {
      expect(mainReducer.reducer(state, { type: setGenre.type, payload: mockFilm.genre }).currentGenre)
        .toEqual(mockFilm.genre);
    });
    it('clears genre films', () => {
      expect(mainReducer.reducer(state, { type: setGenre.type, payload: mockFilm.genre }).genreFilms)
        .toEqual([]);
    });
  });

  describe('setError test', () => {
    it('updates error', () => {
      expect(mainReducer.reducer(state, { type: setError.type, payload: '123' }).error)
        .toEqual('123');
    });
  });

  describe('fetchFilms test', () => {
    it('sets loading true on pending', () => {
      expect(mainReducer.reducer(state, { type: fetchFilms.pending.type, payload: mockFilms }).isFilmsLoading)
        .toEqual(true);
    });
    it('updates films and sets loading false on fulfilled', () => {
      expect(mainReducer.reducer(state, { type: fetchFilms.fulfilled.type, payload: mockFilms }).isFilmsLoading)
        .toEqual(false);
    });
    it('should set films on fulfilled', () => {
      expect(mainReducer.reducer(state, { type: fetchFilms.fulfilled.type, payload: mockFilms }).films)
        .toEqual(mockFilms);
    });
    it('updates films and sets loading false on fulfilled', () => {
      expect(mainReducer.reducer(state, { type: fetchFilms.fulfilled.type, payload: mockFilms }).genreFilms)
        .toEqual(mockFilms);
    });
  });

  describe('fetchFavoriteFilms test', () => {
    it('should set favorite films on fulfilled', () => {
      expect(mainReducer.reducer(state, { type: fetchFavoriteFilms.fulfilled.type, payload: mockFilms }).favoriteFilms)
        .toEqual(mockFilms);
    });
    it('should set favorite films empty on rejected', () => {
      expect(mainReducer.reducer(state, { type: fetchFavoriteFilms.rejected.type, payload: mockFilms }).favoriteFilms)
        .toEqual([]);
    });
  });

  describe('fetchPromo test', () => {
    it('should set promo on fulfilled', () => {
      expect(mainReducer.reducer(state, { type: fetchPromo.fulfilled.type, payload: mockFilm }).promo)
        .toEqual(mockFilm);
    });
  });
});
