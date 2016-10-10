import { createSelector } from 'reselect';

export const selectedSelector = state => state.search.selected;
export const resultsSelector = state => state.search.results;

export const IselectedSelector = state => state.search.get('selected');
export const IresultsSelector = state => state.search.get('results');

export const selectedIdSelector = createSelector(
  selectedSelector,
  resultsSelector,
  (selected, results) => (results[selected] != null ? results[selected].id : null)
);
