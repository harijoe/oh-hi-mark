import _ from 'lodash';
import { combineReducers } from 'redux';
import current from './current';
import info from './info';
import search from './search';
import store from './store';

const reducers = {
  current,
  info,
  search,
  store,
};

// This is some magic to make the reducers work while keeping clean syntax in them
const activatedReducers = _.mapValues(reducers, data => (state = data.initialState, action) => {
  const reduceFn = data.actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
});
export default combineReducers(activatedReducers);
