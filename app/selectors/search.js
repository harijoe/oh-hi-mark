import { createSelector } from 'reselect';

export const selectedSelector = state => state.search.selected;
export const resultsSelector = state => state.search.results;

export const IselectedSelector = state => state.search.get('selected');
export const IresultsSelector = state => state.search.get('results');
export const IlatestResultsSelector = state => state.search.get('latestResults');
export const IquerySelector = state => state.search.get('query');

export const IactualResultsSelector = createSelector(
  IquerySelector,
  IlatestResultsSelector,
  IresultsSelector,
  (query, latestResults, results) => {
    const actualResults = query === '' ? latestResults : results;

    return actualResults;
  }
);
