import React, { useMemo } from 'react';
import { useAppSelector } from '../../../../hooks/store';
import { ReducerName } from '../../../../types/reducer-name';
import { Genre } from './genre';

const GenreListComponent: React.FC = () => {
  const activeGenre = useAppSelector((state) => state[ReducerName.Main].currentGenre);
  const stateFilms = useAppSelector((state) => state[ReducerName.Main].films);

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
