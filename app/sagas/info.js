import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import * as ActionTypes from '../constants/ActionTypes';
import { setToken } from '../actions/info';
import * as InfoSelectors from '../selectors/info';
import { getAuthToken } from '../services/auth';
import { initAxios } from '../services/axios';
import { setStoreInfoSaga } from './current';
import { setLatestResults } from '../actions/search';
import { setSynced } from '../actions/store';
import * as awsStorage from '../services/documentStore/awsStorage';
import * as localStorage from '../services/documentStore/localStorage';
import store, { setStore } from '../services/documentStore/container';

function* startOAuthFlowSaga() {
  const id = yield select(InfoSelectors.IidSelector);
  const token = yield call(getAuthToken, id);
  yield* handleTokenSaga(token);
}

function* retrieveOAuthSaga() {
  const id = yield select(InfoSelectors.IidSelector);
  const token = yield call(getAuthToken, id, false);
  yield* handleTokenSaga(token);
}

function* handleTokenSaga(token) {
  if (token != null) {
    yield call(initAxios, token);
    yield put(setToken(token));
    console.log('sync store saga');
    const synced = yield* syncStoreSaga();
    yield put(setSynced(synced));
  }
}

function* syncStoreSaga() {
  console.log('sync store saga');
  const remoteStore = yield call(awsStorage.fetch);

  const usefulMerge = store.merge(remoteStore);
  if (usefulMerge) {
    const status = yield call(awsStorage.push, store);
    if (status !== 201) {
      return false;
    }
    setStore(store); // TODO check if yield is neededs
    yield* retrieveLatestResultsSaga();
    yield* setStoreInfoSaga();
    yield call(localStorage.push, store);
  }

  return true;
}

export const retrieveLatestResultsSaga = function* () {
  console.log('LATEST DOCS', store.getDocuments());
  const latestResults = _.sortBy(store.getDocuments(), 'date')
    .slice(-6) // Max results
    .reverse();
  console.log('LATEST', latestResults);
  yield put(setLatestResults(latestResults));
};

export default function* () {
  yield [
    takeLatest(ActionTypes.REQUEST_TOKEN, startOAuthFlowSaga),
    takeLatest(ActionTypes.INIT_APP, retrieveOAuthSaga),
    takeLatest(ActionTypes.RESET_POPUP, retrieveOAuthSaga),
  ];
}
