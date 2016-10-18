import Immutable from 'immutable';
import * as ActionTypes from '../constants/ActionTypes';

const initialState = new Immutable.Map({
  extraction: null,
  saved: false,
  tab: null,
  storeInfo: new Immutable.Map(),
  hoveringSaveBtn: false,
});

const actionsMap = {
  [ActionTypes.RESET_POPUP](state) {
    return state.set('hoveringSaveBtn', false);
  },
  [ActionTypes.SET_SAVED](state, action) {
    return state.set('saved', action.saved);
  },
  [ActionTypes.SET_EXTRACTION](state, action) {
    return state.set('extraction', Immutable.fromJS(action.extraction));
  },
  [ActionTypes.SET_TAB](state, action) {
    return state.set('tab', Immutable.fromJS(action.tab));
  },
  [ActionTypes.SET_STORE_INFO](state, action) {
    return state.set('storeInfo', action.info);
  },
  [ActionTypes.SET_HOVERING_SAVE_BTN](state, action) {
    return state.set('hoveringSaveBtn', action.hoveringSaveBtn);
  }
};

export default {
  initialState,
  actionsMap,
};
