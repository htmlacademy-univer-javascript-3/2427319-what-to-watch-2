import React, { useState } from 'react';
import { SmallFilmCard } from './small-film-card';
import { useAppSelector } from '../../../../hooks/store';
import { Spinner } from '../../../spinner/spinner';

interface FilmsListComponentProps {
  maxLength?: number;
  genre?: string;
}

const FilmsListComponent: React.FC<FilmsListComponentProps> = ({
  maxLength,
  genre,
}) => {
  const stateGenreFilms = useAppSelector((state) => state.genreFilms);
  const stateFilms = useAppSelector((state) => state.films);
  const isLoading = useAppSelector((state) => state.isFilmsLoading);

  const [activeFilm, setActiveFilm] = useState<string | null>(null);

  const handleCardHover = (filmId: string) => {
    setActiveFilm(filmId);
  };

  const handleCardLeave = () => {
    setActiveFilm(null);
  };

  const filteredFilms = genre
    ? stateFilms.filter((film) => film.genre === genre)
    : stateGenreFilms;
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
