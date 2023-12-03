import React from 'react';
import { filmsInfo } from '../../../../mocs/films';
import { SmallFilmCard } from './small-film-card';

interface FilmsListComponentProps {
  length?: number;
  genre?: string;
}

const FilmsListComponent: React.FC<FilmsListComponentProps> = ({
  length = filmsInfo.length,
  genre
}) => {
  const filteredFilms = genre ? filmsInfo.filter((film) => film.genre === genre) : filmsInfo;

  return (
    <div className="catalog__films-list">
      {filteredFilms.slice(0, length).map((film) => (
        <SmallFilmCard
          film={film}
          key={film.id}
        />
      ))}
    </div>
  );
};

export const FilmsList = React.memo(FilmsListComponent);
