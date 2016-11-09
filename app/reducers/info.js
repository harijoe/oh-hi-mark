import Immutable from 'immutable';
import * as ActionTypes from '../constants/ActionTypes';

const initialState = new Immutable.Map({
  os: null,
  id: null,
  email: null,
  token: null,
});

const actionsMap = {
  [ActionTypes.SET_OS](state, action) {
    return state.set('os', action.os);
  },
  [ActionTypes.SET_ID](state, action) {
    return state.set('id', action.id);
  },
  [ActionTypes.SET_EMAIL](state, action) {
    return state.set('email', action.email);
  },
  [ActionTypes.SET_TOKEN](state, action) {
    return state.set('token', action.token);
  },
};

export default {
  initialState,
  actionsMap,
};
