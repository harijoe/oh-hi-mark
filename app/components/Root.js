import React from 'react';
import TopBarContainer from '../containers/TopBarContainer';
import ResultsContainer from '../containers/ResultsContainer';

function Root() {
  return (
    <div style={{ margin: 5 }}>
      <TopBarContainer />
      <ResultsContainer />
    </div>
  );
}

export default Root;
