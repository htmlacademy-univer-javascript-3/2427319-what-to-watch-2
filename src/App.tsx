import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { ScrollToTop } from './components/scroll-to-top';
import { useAppSelector } from './hooks/store';
import { AppRouter } from './router';
import {store} from './store';
import {checkAuth, fetchFilms} from './store/api-actions.ts';
import { ReducerName } from './types/reducer-name';


const App: React.FC = () => {
  const error = useAppSelector((state) => state[ReducerName.Main].error);

  useEffect(() => {
    toast(error);
  }, [error]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted){
      store.dispatch(fetchFilms());
      store.dispatch(checkAuth());
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRouter />
      <ToastContainer position='bottom-right' />
    </BrowserRouter>
  );
};

export default App;
