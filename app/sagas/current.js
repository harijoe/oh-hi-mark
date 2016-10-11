import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import * as ActionTypes from '../constants/ActionTypes';
import { setSaved, setTab } from '../actions/current';
import { setIcon } from '../services/icon';
import inject from '../services/inject';
import { addDoc, persistIndex, hasDoc } from '../services/elasticlunr';
import { IcurrentTabSelector, IextractionSelector } from '../selectors/current';

function* savePageSaga() {
  yield call(inject);
  yield put(setSaved(true));
}

function* handleIconSaga(action) {
  yield call(setIcon, action.saved);
}

function* refreshSavedSaga(action) {
  const saved = yield call(hasDoc, action.tab.url);
  yield put(setSaved(saved));
}

function* handleExtractionSaga() {
  const extraction = yield select(IextractionSelector);
  yield call(addDoc, extraction.toJS());
  yield call(persistIndex);

  const tab = yield select(IcurrentTabSelector);
  yield* refreshSavedSaga(setTab(tab.toJS()));
}

export default function* () {
  yield [
    takeEvery(ActionTypes.SAVE_PAGE, savePageSaga),
    takeEvery(ActionTypes.SET_EXTRACTION, handleExtractionSaga),
    takeEvery(ActionTypes.SET_SAVED, handleIconSaga),
    takeEvery(ActionTypes.SET_TAB, refreshSavedSaga),
  ];
}
