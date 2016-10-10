import * as types from '../constants/ActionTypes';

export function setQuery(query) {
  return { type: types.SET_QUERY, query };
}

export function setResults(results) {
  return { type: types.SET_RESULTS, results };
}

export function resetPopup() {
  return { type: types.RESET_POPUP };
}
