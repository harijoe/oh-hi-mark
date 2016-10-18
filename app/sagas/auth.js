import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import * as ActionTypes from '../constants/ActionTypes';
import { setToken } from '../actions/auth';
// import { setEmail, setId } from '../actions/info';
import * as InfoSelectors from '../selectors/info';
import { getAuthToken, getIdentity } from '../services/auth';

function* startOAuthFlowSaga() {
  const id = yield select(InfoSelectors.IidSelector);
  const token = yield call(getAuthToken, id);
  if (token == null) { return; }
  yield put(setToken(token));
  // const identity = yield call(getIdentity);
  // yield put(setEmail(identity.email));
  // yield put(setId(identity.id));
  // if (identity.email == null) { return; }

  // Call patch with token
}

export default function* () {
  yield [
    takeLatest(ActionTypes.REQUEST_TOKEN, startOAuthFlowSaga),
  ];
}
