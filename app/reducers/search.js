import Immutable from 'immutable';
import * as ActionTypes from '../constants/ActionTypes';

const initialState = new Immutable.Map({
  query: '',
  results: new Immutable.List(),
});

const actionsMap = {
  [ActionTypes.SET_QUERY](state, action) {
    return state.set('query', action.query);
  },
  [ActionTypes.SET_RESULTS](state, action) {
    return state.set('results', Immutable.fromJS(action.results));
  },
  [ActionTypes.RESET_POPUP](state) {
    return state.set('query', initialState.get('query'));
  },
  [ActionTypes.SET_SELECTED](state, action) {
    return state.set('selected', action.selected);
  },
};

export default {
  initialState,
  actionsMap,
};
