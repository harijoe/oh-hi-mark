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
    <div>
      <TextField
        hintText={`Search through ${props.storeLength} documents`}
        hintStyle={{ marginLeft: 10 }}
        inputStyle={{ marginLeft: 10 }}
        className={css(styles.textField)}
        autoFocus
        fullWidth
        onChange={e => props.actions.setQuery(e.target.value)}
      />
      <img className={css(styles.inapp)} alt="Oh, hi mark!" src="img/inapp.png" />
    </div>
  );
}

const styles = StyleSheet.create({
  noDocs: {
    textAlign: 'center',
    color: 'grey',
  },
  inapp: {
    height: 45,
    verticalAlign: 'middle',
    marginLeft: '4%',
  },
  textField: {
    width: '68%',
  }
});

SearchInput.propTypes = {
  query: PropTypes.string,
  storeLength: PropTypes.number,
  actions: PropTypes.shape({
    typeQuery: PropTypes.func,
  }),
};

export default SearchInput;
