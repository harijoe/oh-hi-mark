import Immutable from 'immutable';
import * as ActionTypes from '../constants/ActionTypes';

const initialState = new Immutable.Map({
  os: null,
});

const actionsMap = {
  [ActionTypes.SET_OS](state, action) {
    return state.set('os', action.os);
  },
};

export default {
  initialState,
  actionsMap,
};
