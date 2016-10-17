import React from 'react';
import SearchInputContainer from '../containers/SearchInputContainer';
import SaveButtonContainer from '../containers/SaveButtonContainer';
import LogoContainer from '../containers/LogoContainer';

function TopBar() {
  return (<div>
    <SearchInputContainer />
    <LogoContainer />
    <SaveButtonContainer />
  </div>);
}

export default TopBar;
