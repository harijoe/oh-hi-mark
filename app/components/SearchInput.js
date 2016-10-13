import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import { StyleSheet, css } from 'aphrodite';

function SearchInput(props) {
  if (props.storeLength === 0) {
    return (<div className={css(styles.noDocs)}>
      <p>Your have saved no document yet</p>
      <p>Press Ctrl+Shift+S on a webpage to save it</p>
    </div>);
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

const styles = StyleSheet.create({
  noDocs: {
    textAlign: 'center',
    color: 'grey',
  },
});

SearchInput.propTypes = {
  query: PropTypes.string,
  storeLength: PropTypes.number,
  actions: PropTypes.shape({
    typeQuery: PropTypes.func,
  }),
};

export default SearchInput;
