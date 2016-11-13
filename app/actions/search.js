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

export function setSelected(selected) {
  return { type: types.SET_SELECTED, selected };
}

export function setLatestResults(latestResults) {
  return { type: types.SET_LATEST_RESULTS, latestResults };
}

export function incrementSelected() {
  return { type: types.INCREMENT_SELECTED };
}

export function decrementSelected() {
  return { type: types.DECREMENT_SELECTED };
}

export function redirectToSelected() {
  return { type: types.REDIRECT_TO_SELECTED };
}
