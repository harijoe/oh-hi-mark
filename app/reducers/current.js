import Immutable from 'immutable';
import * as ActionTypes from '../constants/ActionTypes';

const initialState = new Immutable.Map({
  message: '',
  content: null,
});

const actionsMap = {
  [ActionTypes.SAY_HELLO](state, action) {
    return state.set('message', action.message);
  },
  [ActionTypes.SET_CONTENT](state, action) {
    return state.set('content', action.content);
  }
};

export default {
  initialState,
  actionsMap,
};
