import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import * as ActionTypes from '../constants/ActionTypes';
import { setResults } from '../actions/search';
import { search, hydrate } from '../../app/services/elasticlunr';

function* getResultsSaga(action) {
  const rawResults = yield call(search, action.query);
  console.log(rawResults);
  const results = hydrate(rawResults);
  console.log(results);
  yield put(setResults(results));
}

export default function* () {
  yield [
    takeLatest(ActionTypes.SET_QUERY, getResultsSaga)
  ];
}
