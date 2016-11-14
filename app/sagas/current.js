import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import * as ActionTypes from '../constants/ActionTypes';
import { setSaved, setTab, setStoreInfo, setForbiddenURL } from '../actions/current';
import { setIcon } from '../services/icon';
import { injectExtraction, injectToastr } from '../services/inject';
import { addDoc, persistIndex, hasDoc, info } from '../services/elasticlunr';
import { IcurrentTabSelector, IextractionSelector, IsavedSelector } from '../selectors/current';
import { ItokenSelector } from '../selectors/info';
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
    yield put(setSaved(false));
    return;
  }

  // Check if URL is injectable
  const injectableRegexp =
    new RegExp(/(^chrome.*)|(^https?:\/\/chrome\.google\.com\/webstore\/.*)/g);
  yield put(setForbiddenURL(injectableRegexp.test(action.tab.url)));

  const saved = yield call(hasDoc, action.tab.url);
  yield put(setSaved(saved));
}

function* handleExtractionSaga() {
  const extraction = yield select(IextractionSelector);

  // Case where extraction when wrong
  if (extraction == null) {
    yield put(setSaved(false));
    return;
  }

  yield call(addDoc, extraction.toJS());
  yield call(persistIndex);

  const token = yield select(ItokenSelector);
  if (token != null) {
    yield call(pushStore);
  }

  yield* setStoreInfoSaga();

  // Force refresh of saved
  const tab = yield select(IcurrentTabSelector);

  if (tab != null) {
    yield* refreshSavedSaga(setTab(tab.toJS()));
  }
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
