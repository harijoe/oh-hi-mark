import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import * as ActionTypes from '../constants/ActionTypes';
import { setToken } from '../actions/info';
import * as InfoSelectors from '../selectors/info';
import { getAuthToken } from '../services/auth';
import { initAxios } from '../services/axios';
import { syncStore } from '../services/sync';
import { setStoreInfoSaga } from './current';
import { setLatestResults } from '../actions/search';
import { setSynced } from '../actions/store';
import { getLatestResults } from '../../app/services/elasticlunr';

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
    const synced = yield call(syncStore);
    yield put(setSynced(synced));
  }
  yield* setStoreInfoSaga();
  yield* retrieveLatestResultsSaga();
}

function* retrieveLatestResultsSaga() {
  const latestResults = yield call(getLatestResults);
  yield put(setLatestResults(latestResults));
}

export default function* () {
  yield [
    takeLatest(ActionTypes.REQUEST_TOKEN, startOAuthFlowSaga),
    takeLatest(ActionTypes.INIT_APP, retrieveOAuthSaga),
    takeLatest(ActionTypes.RESET_POPUP, retrieveOAuthSaga),
  ];
}
