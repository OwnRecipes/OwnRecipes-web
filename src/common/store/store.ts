/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line camelcase
import { applyMiddleware, compose, legacy_createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducer from '../../app/Store';
import { isDemoMode } from '../utility';

let data;
if (isDemoMode()) {
  // eslint-disable-next-line global-require
  data = require('../../demo/store/data.json');
}

const composeEnhancers = (
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    && ((
      process.env.NODE_ENV === 'production'
        && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          features: {
            export: true,
          },
        })
    ) || (
      (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        trace: true,
        traceLimit: 25,
      })
    ))
  ) || compose;

const store = legacy_createStore(
  reducer,
  data,
  composeEnhancers(
    applyMiddleware(thunkMiddleware)
  )
);

export default store;
