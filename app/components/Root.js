import React from 'react';
import SearchInputContainer from '../containers/SearchInputContainer';
import ResultsContainer from '../containers/ResultsContainer';
import style from './Root.css';

function Root() {
  return (
    // TODO DO PROPER RESET HERE
    <div className={style.body}>
      <SearchInputContainer />
      <ResultsContainer />
    </div>
  );
}

Root.propTypes = {
};

export default Root;
