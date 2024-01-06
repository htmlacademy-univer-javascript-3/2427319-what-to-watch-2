import { FC, ReactNode, memo } from 'react';
import { Film } from '../../../../types/film.ts';
interface FilmDetailsItemProps {
  name: string;
  children: ReactNode;
}

const MINUTES_IN_HOUR = 60;

const FilmDetailsItemComponent: FC<FilmDetailsItemProps> = ({
  name,
  children,
}) => (
  <p className="film-card__details-item">
    <strong className="film-card__details-name">{name}</strong>
    <span className="film-card__details-value">{children}</span>
  </p>
);

const FilmDetailsItem = memo(FilmDetailsItemComponent);

interface DetailsProps {
  film: Film;
}

const DetailsTabComponent: FC<DetailsProps> = ({ film }) => {
  const { genre, runTime, director, released, starring } = film;
  const hours = Math.floor(runTime / MINUTES_IN_HOUR);
  const minutes = runTime % MINUTES_IN_HOUR;

  return (
    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        <FilmDetailsItem name="Director">{director}</FilmDetailsItem>
        <FilmDetailsItem name="Starring">{starring.join(', ')}</FilmDetailsItem>
      </div>

      <div className="film-card__text-col">
        <FilmDetailsItem name="Run Time">{`${hours}h ${minutes}m`}</FilmDetailsItem>
        <FilmDetailsItem name="Genre">{genre}</FilmDetailsItem>
        <FilmDetailsItem name="Released">{released}</FilmDetailsItem>
      </div>
    </div>
  );
};

export const DetailsTab = memo(DetailsTabComponent);
