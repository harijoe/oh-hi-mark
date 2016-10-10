import * as types from '../constants/ActionTypes';

export function savePage() {
  return { type: types.SAVE_PAGE };
}

export function setTab(tab) {
  return { type: types.SET_TAB, tab };
}

export function setSaved(saved) {
  return { type: types.SET_SAVED, saved };
}

export function setExtraction(extraction) {
  return { type: types.SET_EXTRACTION, extraction };
}
