import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import * as ActionTypes from '../constants/ActionTypes';
import { setSaved, setTab, setForbiddenURL } from '../actions/current';
import { setStoreInfo } from '../actions/store';
import { setIcon } from '../services/icon';
import { injectExtraction, injectToastr } from '../services/inject';
import store, { setStore } from '../services/documentStore/container';
import * as localStorage from '../services/documentStore/localStorage';
import * as awsStorage from '../services/documentStore/awsStorage';
import { IcurrentTabSelector, IextractionSelector, IsavedSelector } from '../selectors/current';
import { ItokenSelector } from '../selectors/info';
import { isURLForbidden } from '../services/util';
import { retrieveLatestResultsSaga } from './info';

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

function* removePageSaga() {
  const saved = yield select(IsavedSelector);
  const tab = yield select(IcurrentTabSelector);
  if (!saved) {
    return;
  }
  yield put(setSaved(false));
  store.removeDoc(tab.get('url'));
  yield* setStoreInfoSaga();
  yield* retrieveLatestResultsSaga();
  yield* handleUpdatedIndexSaga();
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
  yield put(setForbiddenURL(isURLForbidden(action.tab.url)));
  const saved = store.hasDoc(action.tab.url);
  yield put(setSaved(saved));
}

function* handleExtractionSaga() {
  const extraction = yield select(IextractionSelector);

  // Case where extraction went wrong
  if (extraction == null) {
    yield put(setSaved(false));
    return;
  }

  store.addDoc(extraction.toJS());
  yield* setStoreInfoSaga();
  yield* retrieveLatestResultsSaga();
  yield* handleUpdatedIndexSaga();
}

function* handleUpdatedIndexSaga() {
  yield call(localStorage.push, store);

  const token = yield select(ItokenSelector);
  if (token != null) {
    yield call(awsStorage.push, store);
  }

  // Force refresh of saved
  const tab = yield select(IcurrentTabSelector);
  if (tab != null) {
    yield* refreshSavedSaga(setTab(tab.toJS()));
  }
}

function* fetchStoreSaga() {
  const remoteStore = yield call(localStorage.fetch);
  setStore(remoteStore); // TODO Check if store is actually updated
  yield* retrieveLatestResultsSaga();
  yield* setStoreInfoSaga();
}

export const setStoreInfoSaga = function* () {
  const storeInfo = { length: store.count() };
  yield put(setStoreInfo(storeInfo));
};

export default function* () {
  yield [
    takeEvery(ActionTypes.SAVE_PAGE, savePageSaga),
    takeEvery(ActionTypes.REMOVE_PAGE, removePageSaga),
    takeEvery(ActionTypes.SET_EXTRACTION, handleExtractionSaga),
    takeEvery(ActionTypes.SET_SAVED, handleIconSaga),
    takeEvery(ActionTypes.SET_TAB, refreshSavedSaga),
    takeEvery(ActionTypes.INIT_APP, fetchStoreSaga),
  ];
}
