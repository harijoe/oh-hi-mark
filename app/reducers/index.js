import _ from 'lodash';
import { combineReducers } from 'redux';
import todos from './todos';

const reducers = {
  todos,
};

// This is some magic to make the reducers work while keeping clean syntax in them
const activatedReducers = _.mapValues(reducers, data => (state = data.initialState, action) => {
  const reduceFn = data.actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
});
export default combineReducers(activatedReducers);
