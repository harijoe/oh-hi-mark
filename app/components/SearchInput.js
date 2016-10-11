import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';

function SearchInput(props) {
  if (props.storeLength === 0) {
    // TODO Add helper
    return <p>Store documents first!</p>;
  }

  return (
    <TextField
      hintText={`Search through ${props.storeLength} documents`}
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
  storeLength: PropTypes.numeric,
  actions: PropTypes.shape({
    typeQuery: PropTypes.func,
  }),
};

export default SearchInput;
