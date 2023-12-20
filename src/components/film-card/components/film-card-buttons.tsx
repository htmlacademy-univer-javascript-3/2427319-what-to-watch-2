import React from 'react';
import { Link } from 'react-router-dom';
import { RouteLinks } from '../../../router/consts';

const enum ButtonSize {
  WIDTH = 19,
  HEIGHT = 19,
}

interface FilmCardButtonsProps {
  filmId: string;
  reviewButton?: boolean;
}

const ButtonsContainerComponent: React.FC<FilmCardButtonsProps> = ({
  filmId,
  reviewButton = false,
}) => (
  <div className="film-card__buttons">
    <Link to={`/player/${filmId}`} className="btn btn--play film-card__button" type="button">
      <svg viewBox="0 0 19 19" width={ButtonSize.WIDTH} height={ButtonSize.HEIGHT}>
        <use xlinkHref="#play-s"></use>
      </svg>
      <span>Play</span>
    </Link>
    <button className="btn btn--list film-card__button" type="button">
      <svg viewBox="0 0 19 20" width={ButtonSize.WIDTH} height={ButtonSize.HEIGHT + 1}>
        <use xlinkHref="#add"></use>
      </svg>
      <span>My list</span>
      <span className="film-card__count">9</span>
    </button>
    {reviewButton ? (
      <Link to={RouteLinks.REVIEW} className="btn film-card__button">
        Add review
      </Link>
    ) : null}
  </div>
);

export const FilmCardButtons = React.memo(ButtonsContainerComponent);
