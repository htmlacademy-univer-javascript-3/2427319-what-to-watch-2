import React from 'react';
import { SmallFilmCard } from './small-film-card';
import { useAppSelector } from '../../../../hooks/store.ts';

interface FilmsListComponentProps {
  maxLength: number;
  genre?: string;
}

const FilmsListComponent: React.FC<FilmsListComponentProps> = ({
  maxLength ,
  genre,
}) => {
  const stateGenreFilms = useAppSelector((state) => state.genreFilms);
  const stateFilms = useAppSelector((state) => state.films);


  const filteredFilms = genre
    ? stateFilms.filter((film) => film.genre === genre)
    : stateGenreFilms;

  return (
    <div className="catalog__films-list">
      {filteredFilms.slice(0, maxLength).map((film) => (
        <SmallFilmCard
          film={film}
          key={film.id}
        />
      ))}
    </div>
  );
};

export const FilmsList = React.memo(FilmsListComponent);
