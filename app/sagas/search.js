import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import * as ActionTypes from '../constants/ActionTypes';
import { setResults, setSelected } from '../actions/search';
import store from '../services/documentStore/container';
import Search from '../services/documentStore/search';
import * as SearchSelectors from '../selectors/search';
import * as CurrentSelectors from '../selectors/current';

function* getResultsSaga(action) {
  const searchEngine = new Search(store);
  const results = yield call(searchEngine.search, action.query);
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

export default function* () {
  yield [
    takeLatest(ActionTypes.SET_QUERY, getResultsSaga),
    takeLatest(ActionTypes.REDIRECT_TO_SELECTED, redirectToSelectedSaga),
  ];
}
