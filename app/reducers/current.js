import Immutable from 'immutable';
import * as ActionTypes from '../constants/ActionTypes';

const initialState = new Immutable.Map({
  extraction: null,
  saved: false,
  tab: null,
});

const actionsMap = {
  [ActionTypes.SAVE_PAGE](state, action) {
    return state.set('saved', action.saved);
  },
  [ActionTypes.SET_EXTRACTION](state, action) {
    return state.set('extraction', Immutable.fromJS(action.extraction));
  },
  [ActionTypes.SET_TAB](state, action) {
    return state.set('tab', Immutable.fromJS(action.tab));
  }
};

export default {
  initialState,
  actionsMap,
};
