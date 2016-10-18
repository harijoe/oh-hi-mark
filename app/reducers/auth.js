import Immutable from 'immutable';
import * as ActionTypes from '../constants/ActionTypes';

const initialState = new Immutable.Map({
  token: null,
});

const actionsMap = {
  [ActionTypes.SET_TOKEN](state, action) {
    return state.set('token', action.token);
  },
};

export default {
  initialState,
  actionsMap,
};
