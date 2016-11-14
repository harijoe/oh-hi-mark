import Immutable from 'immutable';
import * as ActionTypes from '../constants/ActionTypes';

const initialState = new Immutable.Map({
  storeInfo: new Immutable.Map(),
  synced: null,
});

const actionsMap = {
  [ActionTypes.RESET_POPUP](state) {
    const synced = state.get('synced') === false ? null : true;
    return state.set('synced', synced);
  },
  [ActionTypes.SET_STORE_INFO](state, action) {
    return state.set('storeInfo', action.info);
  },
  [ActionTypes.SET_SYNCED](state, action) {
    return state.set('synced', action.synced);
  }
};

export default {
  initialState,
  actionsMap,
};
