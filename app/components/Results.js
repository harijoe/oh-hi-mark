import { StyleSheet, css } from 'aphrodite';
import React, { PropTypes } from 'react';
import ResultsTableContainer from '../containers/ResultsTableContainer';
import NoDocumentContainer from '../containers/NoDocumentContainer';

function Results(props) {
  if (props.storeLength === 0) {
    return <NoDocumentContainer />;
  }
  if (props.query === '') {
    return (<ResultsTableContainer
      isLatestResults
      results={props.latestResults}
    />);
  }

  if (props.results.length === 0) {
    return <p className={css(styles.noResult)}>No result</p>;
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
});

Results.propTypes = {
  results: PropTypes.array,
  latestResults: PropTypes.array,
  storeLength: PropTypes.number,
  query: PropTypes.string,
};

export default Results;
