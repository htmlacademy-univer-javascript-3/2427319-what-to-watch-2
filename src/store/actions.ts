import { createAction } from '@reduxjs/toolkit';
import { Actions } from '../types/actions';
import { Film } from '../types/film';
import { Review } from '../types/review';
import { User } from '../types/user';

export const setGenre = createAction(Actions.SetGenre, (genre: string) => ({
  payload: genre,
}));
export const setFilmsLoadStatus = createAction(
  Actions.SetFilmsLoadStatus,
  (status: boolean) => ({ payload: status })
);
export const setFilms = createAction(Actions.SetFilms, (films: Film[]) => ({
  payload: films,
}));
export const setUser = createAction(Actions.SetUser, (user: User | null) => ({
  payload: user,
}));
export const setAuthorizationStatus = createAction(
  Actions.SetAuthorizationStatus,
  (status: string) => ({ payload: status })
);
export const setError = createAction(
  Actions.SetError,
  (error: string | null) => ({ payload: error })
);
export const setReviews = createAction(
  Actions.SetReviews,
  (review: Review[]) => ({ payload: review })
);
