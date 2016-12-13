import { applyMiddleware, createStore, compose } from 'redux';
import { createTracker } from 'redux-segment';
import rootReducer from '../reducers';
import createSagaMiddleware from 'redux-saga';
import sagas from '../sagas';

const tracker = createTracker();

const sagaMiddleware = createSagaMiddleware();
const enhancer = compose(
  applyMiddleware(sagaMiddleware, tracker),
);

export default function (initialState) {
  const store = createStore(rootReducer, initialState, enhancer);
  sagas.map(sagaMiddleware.run);
  return store;
}
