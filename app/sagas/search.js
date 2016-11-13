import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import * as ActionTypes from '../constants/ActionTypes';
import { setResults, setSelected, setLatestResults } from '../actions/search';
import { search, hydrate, getLatestResults } from '../../app/services/elasticlunr';
import * as SearchSelectors from '../selectors/search';
import * as CurrentSelectors from '../selectors/current';

function* getResultsSaga(action) {
  const rawResults = yield call(search, action.query);
  const results = hydrate(rawResults);
  yield put(setResults(results));
  yield put(setSelected(0));
}

function* redirectToSelectedSaga() {
  const results = yield select(SearchSelectors.IactualResultsSelector);
  const selected = yield select(SearchSelectors.IselectedSelector);
  const currentTabId = yield select(CurrentSelectors.IcurrentTabIdSelector);

  const selectedResult = results.get(selected);


  // Redirects to selected result
  if (selectedResult != null) {
    chrome.tabs.update(currentTabId, { url: selectedResult.get('url') });
  }
}

function* retrieveLatestResults() {
  const latestResults = yield call(getLatestResults);
  yield put(setLatestResults(latestResults));
}

export default function* () {
  yield [
    takeLatest(ActionTypes.SET_QUERY, getResultsSaga),
    takeLatest(ActionTypes.RESET_POPUP, retrieveLatestResults),
    takeLatest(ActionTypes.REDIRECT_TO_SELECTED, redirectToSelectedSaga),
  ];
}
