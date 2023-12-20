import React from 'react';
import { AppRouter } from './router';
import { BrowserRouter } from 'react-router-dom';
import { ScrollToTop } from './components/scroll-to-top';

const App: React.FC = () => (
  <BrowserRouter>
    <ScrollToTop />
    <AppRouter />
  </BrowserRouter>
);

export default App;
