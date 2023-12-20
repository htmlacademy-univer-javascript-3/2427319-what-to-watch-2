import React, { useCallback, useState } from 'react';
import { SmallFilmCard } from './small-film-card';
import { useAppSelector } from '../../../../hooks/store';
import { Spinner } from '../../../spinner/spinner';
import { ReducerName } from '../../../../types/reducer-name';
import { Film } from '../../../../types/film';

interface FilmsListComponentProps {
  maxLength?: number;
  similar?: Film[];
}

const FilmsListComponent: React.FC<FilmsListComponentProps> = ({
  maxLength,
  similar,
}) => {
  const stateGenreFilms = useAppSelector(
    (state) => state[ReducerName.Main].genreFilms
  );
  const isLoading = useAppSelector(
    (state) => state[ReducerName.Main].isFilmsLoading
  );

  const [activeFilm, setActiveFilm] = useState<string | null>(null);

  const handleCardHover = useCallback((filmId: string) => {
    setActiveFilm(filmId);
  }, []);

  const handleCardLeave = useCallback(() => {
    setActiveFilm(null);
  }, []);

  const filteredFilms = similar || stateGenreFilms;

  return (
    <div className="catalog__films-list">
      {isLoading ? (
        <Spinner />
      ) : (
        filteredFilms
          .slice(0, maxLength)
          .map((film) => (
            <SmallFilmCard
              film={film}
              key={film.id}
              isActive={film.id === activeFilm}
              onMouseEnter={handleCardHover}
              onMouseLeave={handleCardLeave}
            />
          ))
      )}
    </div>
  );
};

export const FilmsList = React.memo(FilmsListComponent);
