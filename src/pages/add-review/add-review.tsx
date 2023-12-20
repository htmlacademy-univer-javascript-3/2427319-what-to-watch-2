import React, { useLayoutEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Header } from '../../components/header';
import { RouteLinks } from '../../router/consts';
import { Poster } from '../../components/poster';
import { AddReviewForm } from '../../components/add-review-form';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { Spinner } from '../../components/spinner/spinner';
import { fetchFilm } from '../../store/api-action';

const AddReviewPage: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const film = useAppSelector((state) => state.film);
  const isLoading = useAppSelector((state) => state.isFilmLoading);

  useLayoutEffect(() => {
    if (id) {
      dispatch(fetchFilm(id));
    }
  }, [id, dispatch]);

  if (isLoading || !film) {
    return <Spinner fullDisplay />;
  }

  if ((!film && !isLoading) || !id) {
    return <Navigate to={RouteLinks.NOT_FOUND} />;
  }

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film.backgroundColor} alt={film.name} />
        </div>
        <Header>
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/films/${film.id}`} className="breadcrumbs__link">
                  {film.name}
                </Link>
              </li>
              <li className="breadcrumbs__item">
                <Link to="" className="breadcrumbs__link">
                  Add review
                </Link>
              </li>
            </ul>
          </nav>
        </Header>

        <Poster
          src={film.posterImage}
          alt={film.name}
          className="film-card__poster--small"
        />
      </div>
      {/* onSubmit заглушка */}
      <AddReviewForm onSubmit={(a, b)=> (a + b)} />
    </section>
  );
};
export const AddReview = React.memo(AddReviewPage);
