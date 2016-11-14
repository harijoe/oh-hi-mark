import Immutable from 'immutable';
import * as ActionTypes from '../constants/ActionTypes';

const initialState = new Immutable.Map({
  extraction: null,
  saved: false,
  tab: null,
  storeInfo: new Immutable.Map(),
  showTooltip: false,
  forbiddenURL: true,
  synced: null,
});

const actionsMap = {
  [ActionTypes.RESET_POPUP](state) {
    const synced = state.get('synced') === false ? null : true;
    return state.merge({
      hoveringSaveBtn: false,
      synced,
    });
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
  [ActionTypes.SET_SHOW_TOOLTIP](state, action) {
    return state.set('showTooltip', action.showTooltip);
  },
  [ActionTypes.SET_FORBIDDEN_URL](state, action) {
    return state.set('forbiddenURL', action.forbiddenURL);
  },
  [ActionTypes.SET_SYNCED](state, action) {
    return state.set('synced', action.synced);
  }
};

export default {
  initialState,
  actionsMap,
};
