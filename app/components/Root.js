import React from 'react';
import SearchInputContainer from '../containers/SearchInputContainer';
import ResultsContainer from '../containers/ResultsContainer';

function Root() {
  return (
    <div style={{ margin: 5 }}>
      <SearchInputContainer />
      <ResultsContainer />
    </div>
  );
}

Root.propTypes = {
};

export default Root;
