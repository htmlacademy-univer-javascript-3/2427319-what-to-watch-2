import { useMemo } from 'react';
import { FilmInfoProps, filmsInfo } from '../mocs/films';

const SECONDS_IN_HOUR = 3600;
const SECONDS_IN_MINUTE = 60;

const findFilmById = (films: FilmInfoProps[], id: string) =>
  films.find((film) => film.id === Number(id));

export const useFilmById = (id = '') => useMemo(() => findFilmById(filmsInfo, id), [id]);

export const useFilmRating = (rating = 0) => {
  if (rating >= 9) {
    return 'Excellent';
  } else if (rating >= 8) {
    return 'Very good';
  } else if (rating >= 7) {
    return 'Good';
  } else if (rating >= 6) {
    return 'Average';
  }
  return 'Below average';
};

export const formatTime = (timeInSeconds: number) => {
  const hours = Math.floor(timeInSeconds / SECONDS_IN_HOUR);
  const minutes = Math.floor((timeInSeconds % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE);
  const seconds = Math.floor(timeInSeconds % SECONDS_IN_MINUTE);

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};
