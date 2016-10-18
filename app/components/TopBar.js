import React, { PropTypes } from 'react';
import SearchInputContainer from '../containers/SearchInputContainer';
import SaveButtonContainer from '../containers/SaveButtonContainer';
import LogoContainer from '../containers/LogoContainer';
import NoDocumentContainer from '../containers/NoDocumentContainer';

function TopBar(props) {
  if (props.storeLength === 0) {
    return <NoDocumentContainer />
  }
  return (<div>
    <SearchInputContainer />
    <LogoContainer />
    <SaveButtonContainer />
  </div>);
}

TopBar.propTypes = {
  storeLength: PropTypes.number,
  os: PropTypes.string,
};

export default TopBar;
