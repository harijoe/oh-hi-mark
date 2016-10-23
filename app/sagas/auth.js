import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import * as ActionTypes from '../constants/ActionTypes';
import { setToken } from '../actions/auth';
import * as InfoSelectors from '../selectors/info';
import { getAuthToken } from '../services/auth';
import { initAxios } from '../services/axios';
import { syncStore } from '../services/sync';
import { setStoreInfoSaga } from './current';

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
  if (token == null) { return; }
  yield call(initAxios, token);
  yield put(setToken(token));
  yield call(syncStore);
  yield* setStoreInfoSaga();
}

export default function* () {
  yield [
    takeLatest(ActionTypes.REQUEST_TOKEN, startOAuthFlowSaga),
    takeLatest(ActionTypes.INIT_APP, retrieveOAuthSaga),
    takeLatest(ActionTypes.RESET_POPUP, retrieveOAuthSaga),
  ];
}
