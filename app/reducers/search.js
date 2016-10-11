import Immutable from 'immutable';
import * as ActionTypes from '../constants/ActionTypes';

const initialState = new Immutable.Map({
  query: '',
  results: new Immutable.List(),
  selected: null,
});

const actionsMap = {
  [ActionTypes.SET_QUERY](state, action) {
    return state.set('query', action.query);
  },
  [ActionTypes.SET_RESULTS](state, action) {
    return state.set('results', Immutable.fromJS(action.results));
  },
  [ActionTypes.RESET_POPUP](state) {
    return state.merge({
      query: initialState.get('query'),
      results: initialState.get('results'),
      selected: 0,
    });
  },
  [ActionTypes.SET_SELECTED](state, action) {
    return state.set('selected', action.selected);
  },
  [ActionTypes.INCREMENT_SELECTED](state) {
    if (state.get('results').size <= state.get('selected') + 1) {
      return state;
    }

    return state.set('selected', state.get('selected') + 1);
  },
  [ActionTypes.DECREMENT_SELECTED](state) {
    if (state.get('selected') - 1 < 0) {
      return state;
    }

    return state.set('selected', state.get('selected') - 1);
  },
};

export default {
  initialState,
  actionsMap,
};
