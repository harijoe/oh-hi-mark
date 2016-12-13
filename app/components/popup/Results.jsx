import { StyleSheet, css } from 'aphrodite';
import React, { PropTypes } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import ResultsTableContainer from '../../containers/popup/ResultsTableContainer';
import NoDocumentContainer from '../../containers/popup/NoDocumentContainer';

function Results(props) {
  if (props.storeLength === 0) {
    return <NoDocumentContainer />;
  }

  if (props.query === '' || props.results === null) {
    if (props.latestResults.length === 0) {
      return (<div className={css(styles.loading)}>
        <CircularProgress />
      </div>);
    }

    return (<ResultsTableContainer
      isLatestResults
      results={props.latestResults}
    />);
  }

  if (props.results.length === 0) {
    return <p className={css(styles.noResult)}>No result found — Try something else</p>;
  }

  return (
    <ResultsTableContainer
      results={props.results}
    />
  );
}

const styles = StyleSheet.create({
  noResult: {
    textAlign: 'center',
    color: 'grey',
    height: 60,
    lineHeight: '60px',
  },
  loading: {
    textAlign: 'center',
    color: 'grey',
    margin: 50,
  },
});

Results.propTypes = {
  results: PropTypes.array,
  latestResults: PropTypes.array,
  storeLength: PropTypes.number,
  query: PropTypes.string,
};

export default Results;
