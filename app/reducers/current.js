import Immutable from 'immutable';
import * as ActionTypes from '../constants/ActionTypes';

const initialState = new Immutable.Map({
  extraction: null,
  saved: false,
  tab: null,
  showTooltip: false,
  forbiddenURL: true,
});

const actionsMap = {
  [ActionTypes.SET_SAVED](state, action) {
    return state.set('saved', action.saved);
  },
  [ActionTypes.SET_EXTRACTION](state, action) {
    return state.set('extraction', Immutable.fromJS(action.extraction));
  },
  [ActionTypes.SET_TAB](state, action) {
    return state.set('tab', Immutable.fromJS(action.tab));
  },
  [ActionTypes.SET_SHOW_TOOLTIP](state, action) {
    return state.set('showTooltip', action.showTooltip);
  },
  [ActionTypes.SET_FORBIDDEN_URL](state, action) {
    return state.set('forbiddenURL', action.forbiddenURL);
  },
  [ActionTypes.RESET_POPUP](state) {
    return state.set('showTooltip', false);
  },
};

export default {
  initialState,
  actionsMap,
};
