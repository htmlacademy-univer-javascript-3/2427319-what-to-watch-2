import React, { useEffect } from 'react';
import { Catalog } from '../../components/catalog';
import { FilmCard } from '../../components/film-card';
import { Footer } from '../../components/footer';
import { Spinner } from '../../components/spinner/spinner';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { fetchPromo } from '../../store/api-actions';
import { ReducerName } from '../../types/reducer-name';
import { Page404 } from '../page-404';

const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isPromoLoading, promo } = useAppSelector((state) => state[ReducerName.Main]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(fetchPromo());
    }
    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  if (isPromoLoading) {
    return <Spinner />;
  }

  return promo ? (
    <>
      <FilmCard film={promo} />
      <div className="page-content">
        <Catalog />
        <Footer />
      </div>
    </>
  ) : (
    <Page404 />
  );
};
export const Main = React.memo(MainPage);
