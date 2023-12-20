import React, { useMemo } from 'react';
import { Genre } from './genre';
import { useAppSelector } from '../../../../hooks/store';

const GenreListComponent: React.FC = () => {
  const activeGenre = useAppSelector((state) => state.genre);
  const stateFilms = useAppSelector((state) => state.films);

  const genreList = useMemo(() => ['All genres', ...new Set(stateFilms.map((film) => film.genre))], [stateFilms]);

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
