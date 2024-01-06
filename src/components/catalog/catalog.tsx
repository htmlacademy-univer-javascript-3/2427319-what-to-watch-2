import React, { useCallback, useState } from 'react';
import { useAppSelector } from '../../hooks/store';
import { Film } from '../../types/film';
import { ReducerName } from '../../types/reducer-name';
import { Button } from '../button';
import { FilmsList } from './components/films-list';
import { GenreList } from './components/genre-list';

interface CatalogProps {
  showGenreList?: boolean;
  showLoadMoreButton?: boolean;
  listLength?: number;
  films?: Film[];
}

const DEFAULT_LIST_LENGTH = 8;


const CatalogComponent: React.FC<CatalogProps> = ({
  showGenreList = true,
  showLoadMoreButton = true,
  listLength,
  films,
}) => {
  const stateGenreFilms = useAppSelector((state) => state[ReducerName.Main].genreFilms);
  const [maxLength, setMaxLength] = useState(listLength || DEFAULT_LIST_LENGTH);

  const handleClick = useCallback(()=>{
    setMaxLength((prev) => prev + DEFAULT_LIST_LENGTH);
  },[]);

  const showButton = showLoadMoreButton && stateGenreFilms.length >= maxLength;

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      {showGenreList ? <GenreList /> : null}

      <FilmsList maxLength={maxLength} films={films} />

      {showButton ? (
        <div className="catalog__more">
          <Button label="Show more" className="catalog__button" type="button" onClick={handleClick}/>
        </div>
      ) : null}
    </section>
  );
};

export const Catalog = React.memo(CatalogComponent);
