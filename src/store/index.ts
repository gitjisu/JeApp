import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './reducer';
import {useDispatch} from 'react-redux';
import logger from 'redux-logger';
import reactotron from '../../config';

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => {
    if (__DEV__) {
      const createDebugger = require('redux-flipper').default;
      return getDefaultMiddleware().concat(createDebugger());
    }
    return getDefaultMiddleware();
  },
  enhancers: [reactotron.createEnhancer!()],
});

export default store;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
