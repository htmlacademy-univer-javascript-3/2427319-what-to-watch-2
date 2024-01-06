import { FC, memo } from 'react';
import { useFilmRatingLabel } from '../../../hooks/films';
import { Film } from '../../../types/film';

interface OverviewTabProps {
  film: Film;
}

const OverviewTabComponent: FC<OverviewTabProps> = ({ film }) => {
  const {
    rating,
    scoresCount,
    director,
    starring,
    description,
  } = film;

  const filmRatingLabel = useFilmRatingLabel(rating);

  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{filmRatingLabel}</span>
          <span className="film-rating__count">{scoresCount} ratings</span>
        </p>
      </div>
      <div className="film-card__text">
        <p style={{ whiteSpace: 'pre-wrap' }}>{description}</p>

        <p className="film-card__director">
          <strong>Director: {director}</strong>
        </p>

        <p className="film-card__starring">
          <strong>Starring: {starring.join(', ')}</strong>
        </p>
      </div>
    </>
  );
};

export const OverviewTab = memo(OverviewTabComponent);
