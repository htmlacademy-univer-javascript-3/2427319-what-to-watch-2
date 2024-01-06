import {configureStore} from '@reduxjs/toolkit';
import {createAPI} from '../services/api';
import {reducer} from './reducer';

export const api = createAPI();

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['/comments/id/fulfilled'],
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        ignoredPaths: ['items.dates'],
      },
      thunk: {
        extraArgument: api,
      },
    }),
});


