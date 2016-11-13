import Immutable from 'immutable';
import * as ActionTypes from '../constants/ActionTypes';

const initialState = new Immutable.Map({
  query: '',
  results: new Immutable.List(),
  latestResults: new Immutable.List(),
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
    // Use actually relevant results
    const results = state.get('query') === '' ? state.get('latestResults') : state.get('results');

    if (results.size <= state.get('selected') + 1) {
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
  [ActionTypes.SET_LATEST_RESULTS](state, action) {
    return state.set('latestResults', Immutable.fromJS(action.latestResults));
  },
};

export default {
  initialState,
  actionsMap,
};
