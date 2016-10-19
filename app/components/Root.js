import React from 'react';
import TopBar from '../components/TopBar';
import ResultsContainer from '../containers/ResultsContainer';

function Root() {
  return (<div style={{ margin: 5 }}>
      <TopBar />
      <ResultsContainer />
    </div>
  );
}

export default Root;
