import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import * as ActionTypes from '../constants/ActionTypes';
import { setToken } from '../actions/auth';
import * as InfoSelectors from '../selectors/info';
import { getAuthToken } from '../services/auth';

function* startOAuthFlowSaga() {
  const id = yield select(InfoSelectors.IidSelector);
  const token = yield call(getAuthToken, id);
  yield put(setToken(token));
}

export default function* () {
  yield [
    takeLatest(ActionTypes.REQUEST_TOKEN, startOAuthFlowSaga),
  ];
}
