import Immutable from 'immutable';
import * as ActionTypes from '../constants/ActionTypes';

const initialState = new Immutable.Map({
  message: 'world'
});

const actionsMap = {
  [ActionTypes.SAY_HELLO](state, action) {
    return state.set('message', action.message);
  }
};

export default {
  initialState,
  actionsMap,
};
