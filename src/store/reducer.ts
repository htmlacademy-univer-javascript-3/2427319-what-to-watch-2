import { createReducer } from '@reduxjs/toolkit';
import { setGenre } from './action';
import { DEFAULT_GENRE } from '../data/genre';
import { fetchFilm, fetchFilms, fetchPromo } from './api-action';
import { MainInitialState } from '../types/state';

const initialState: MainInitialState = {
  films: [],
  genre: DEFAULT_GENRE,
  genreFilms: [],
  isFilmsLoading: false,
  film: null,
  promo: null,
  isFilmLoading: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setGenre, (state, action) => {
      const { genre } = action.payload;

      state.genre = genre;
      state.genreFilms =
        state.genre === DEFAULT_GENRE
          ? state.films
          : state.films.filter((film) => film.genre === genre);
    })
    .addCase(fetchFilms.pending, (state) => {
      state.isFilmsLoading = true;
    })
    .addCase(fetchFilms.fulfilled, (state, action) => {
      state.films = action.payload;
      state.genreFilms = state.films;
      state.isFilmsLoading = false;
    })
    .addCase(fetchFilm.pending, (state) => {
      state.isFilmLoading = true;
    })
    .addCase(fetchFilm.fulfilled, (state, action) => {
      state.film = action.payload;
      state.isFilmLoading = false;
    })
    .addCase(fetchPromo.fulfilled, (state, action) => {
      state.promo = action.payload;
    });
});

export { reducer };
