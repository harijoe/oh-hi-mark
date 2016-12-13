import { EventTypes } from 'redux-segment';
import * as types from '../constants/ActionTypes';

export function savePage() {
  return {
    type: types.SAVE_PAGE,
    meta: {
      analytics: {
        eventType: EventTypes.track,
      },
    },
  };
}

export function removePage() {
  return {
    type: types.REMOVE_PAGE,
    meta: {
      analytics: {
        eventType: EventTypes.track,
      },
    },
  };
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

export function initApp() {
  return {
    type: types.INIT_APP,
    meta: {
      analytics: {
        eventType: EventTypes.track,
      },
    },
  };
}

export function setShowTooltip(showTooltip) {
  return {
    type: types.SET_SHOW_TOOLTIP, showTooltip,
    meta: {
      analytics: {
        eventType: EventTypes.track,
      },
    },
  };
}

export function setForbiddenURL(forbiddenURL) {
  return { type: types.SET_FORBIDDEN_URL, forbiddenURL };
}
