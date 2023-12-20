import React, { useLayoutEffect } from 'react';
import { FilmCard } from '../../components/film-card';
import { Catalog } from '../../components/catalog';
import { Footer } from '../../components/footer';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { fetchPromo } from '../../store/api-action';
import { Spinner } from '../../components/spinner/spinner';

const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const promo = useAppSelector((state) => state.promo);

  useLayoutEffect(() => {
    dispatch(fetchPromo());
  }, [dispatch]);

  if(!promo) {
    return <Spinner />;
  }

  return (
    <>
      <FilmCard film={promo} />
      <div className="page-content">
        <Catalog />
        <Footer />
      </div>
    </>
  );
};
export const Main = React.memo(MainPage);
