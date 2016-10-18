import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import * as ActionTypes from '../constants/ActionTypes';
import { setSaved, setTab, setStoreInfo } from '../actions/current';
import { setIcon } from '../services/icon';
import { injectExtraction, injectToastr } from '../services/inject';
import { addDoc, persistIndex, hasDoc, info } from '../services/elasticlunr';
import { IcurrentTabSelector, IextractionSelector, IsavedSelector } from '../selectors/current';
import { ItokenSelector } from '../selectors/auth';
import { pushStore } from '../services/sync';

function* savePageSaga() {
  const saved = yield select(IsavedSelector);
  if (saved) {
    return;
  }
  yield call(() => {
    injectToastr();
    injectExtraction();
  });
  yield put(setSaved(true));
}

function* handleIconSaga(action) {
  yield call(setIcon, action.saved);
}

function* refreshSavedSaga(action) {
  if (action.tab.url == null || action.tab.url === '') {
    return;
  }
  const saved = yield call(hasDoc, action.tab.url);
  yield put(setSaved(saved));
}

function* handleExtractionSaga() {
  const extraction = yield select(IextractionSelector);
  yield call(addDoc, extraction.toJS());
  yield call(persistIndex);

  const token = yield select(ItokenSelector);
  if (token != null) {
    yield call(pushStore);
  }

  const tab = yield select(IcurrentTabSelector);
  yield* refreshSavedSaga(setTab(tab.toJS()));
  yield* setStoreInfoSaga();
}

export const setStoreInfoSaga = function* () {
  const storeInfo = yield call(info);
  yield put(setStoreInfo(storeInfo));
};

export default function* () {
  yield [
    takeEvery(ActionTypes.SAVE_PAGE, savePageSaga),
    takeEvery(ActionTypes.SET_EXTRACTION, handleExtractionSaga),
    takeEvery(ActionTypes.SET_SAVED, handleIconSaga),
    takeEvery(ActionTypes.SET_TAB, refreshSavedSaga),
    takeEvery(ActionTypes.INIT_APP, setStoreInfoSaga),
  ];
}
