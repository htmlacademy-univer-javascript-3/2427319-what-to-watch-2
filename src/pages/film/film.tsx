import React from 'react';
import { Header } from '../../components/header';
import { FilmCardButtons } from '../../components/film-card/components/film-card-buttons';
import { FilmsList } from '../../components/catalog/components/films-list';
import { Footer } from '../../components/footer';
import { Navigate, useParams } from 'react-router-dom';
import { useFilmById } from '../../hooks/films';
import { RouteLinks } from '../../router/consts';
import { Poster } from '../../components/poster';
import {Tabs} from '../../components/tabs/tabs.tsx';

const SUGGESTED_FILMS_COUNT = 4;

const FilmPage: React.FC = () => {
  const { id } = useParams();
  const film = useFilmById(id);

  if (!film) {
    return <Navigate to={RouteLinks.NOT_FOUND} />;
  }

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film.bgSrc} alt={film.imageSrc} />
          </div>

          <Header className="film-card__head" />

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film.title}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film.genre}</span>
                <span className="film-card__year">{film.year}</span>
              </p>

              <FilmCardButtons reviewButton />
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <Poster
              src={film.imageSrc}
              alt={film.alt}
              className="film-card__poster--big"
            />

            <Tabs film={film}/>


          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <FilmsList length={SUGGESTED_FILMS_COUNT} genre={film.genre} />
        </section>

        <Footer />
      </div>
    </>
  );
};
export const Film = React.memo(FilmPage);
