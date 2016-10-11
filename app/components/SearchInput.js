import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';

function SearchInput(props) {
  return (
    <TextField
      hintText="Search a saved document"
      hintStyle={{ marginLeft: 10 }}
      autoFocus
      fullWidth
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
