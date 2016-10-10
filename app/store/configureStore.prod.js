import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer from '../reducers';
import createSagaMiddleware from 'redux-saga';
import sagas from '../sagas';

const sagaMiddleware = createSagaMiddleware();
const enhancer = compose(
  applyMiddleware(sagaMiddleware),
);

export default function (initialState) {
  const store = createStore(rootReducer, initialState, enhancer);
  sagas.map(sagaMiddleware.run);
  return store;
}
