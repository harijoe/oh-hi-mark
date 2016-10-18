import _ from 'lodash';
import { combineReducers } from 'redux';
import auth from './auth';
import current from './current';
import info from './info';
import search from './search';

const reducers = {
  auth,
  current,
  info,
  search,
};

// This is some magic to make the reducers work while keeping clean syntax in them
const activatedReducers = _.mapValues(reducers, data => (state = data.initialState, action) => {
  const reduceFn = data.actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
});
export default combineReducers(activatedReducers);
