import React from 'react';
import SearchInputContainer from '../../containers/popup/SearchInputContainer';
import SaveButtonContainer from '../../containers/popup/SaveButtonContainer';
import LogoContainer from '../../containers/popup/LogoContainer';

function TopBar() {
  return (<div>
    <SearchInputContainer />
    <LogoContainer />
    <SaveButtonContainer />
  </div>);
}

export default TopBar;
