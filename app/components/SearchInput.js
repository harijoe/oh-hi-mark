import React, { PropTypes } from 'react';

function SearchInput(props) {
  return (
    <input
      autoFocus
      onChange={e => props.actions.setQuery(e.target.value)}
      value={props.query}
    />
  );
}

SearchInput.propTypes = {
  query: PropTypes.string,
  actions: PropTypes.shape({
    typeQuery: PropTypes.func,
  }),
};

export default SearchInput;
