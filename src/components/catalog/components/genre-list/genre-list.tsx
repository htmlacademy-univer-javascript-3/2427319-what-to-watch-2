import React, { useMemo } from 'react';
import { Genre } from './genre';
import { useAppSelector } from '../../../../hooks/store';
import {DEFAULT_GENRE} from '../../../../store/reducer.ts';

const GenreListComponent: React.FC = () => {
  const activeGenre = useAppSelector((state) => state.genre);
  const stateFilms = useAppSelector((state) => state.films);

  const genreList = useMemo(() => [DEFAULT_GENRE, ...new Set(stateFilms.map((film) => film.genre))], [stateFilms]);

  return (
    <ul className="catalog__genres-list">
      {genreList.map((genre) => (
        <Genre
          genre={genre}
          isActive={activeGenre === genre}
          key={genre}
        />
      ))}
    </ul>
  );
};

export const GenreList = React.memo(GenreListComponent);
