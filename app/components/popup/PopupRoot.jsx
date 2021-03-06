import React from 'react';
import TopBar from './TopBar';
import ResultsContainer from '../../containers/popup/ResultsContainer';

function PopupRoot() {
  return (<div style={{ margin: 5 }}>
    <TopBar />
    <ResultsContainer />
  </div>);
}

export default PopupRoot;
