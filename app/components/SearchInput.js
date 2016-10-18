import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import { StyleSheet, css } from 'aphrodite';

function SearchInput(props) {
  return (
    <TextField
      hintText={`Search through ${props.storeLength} documents`}
      hintStyle={{ marginLeft: 10 }}
      inputStyle={{ marginLeft: 10 }}
      className={css(styles.textField)}
      autoFocus
      fullWidth
      onChange={e => props.actions.setQuery(e.target.value)}
    />
  );
}

const styles = StyleSheet.create({
  textField: {
    width: '68%',
  },
});

SearchInput.propTypes = {
  storeLength: PropTypes.number,
  actions: PropTypes.shape({
    setQuery: PropTypes.func,
  }),
};

export default SearchInput;
