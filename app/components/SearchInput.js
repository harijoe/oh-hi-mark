import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import { StyleSheet, css } from 'aphrodite';

function SearchInput(props) {
  if (props.storeLength === 0) {
    const shortcut = props.os === 'mac' ? 'Command+Shift+S' : 'Ctrl+Shift+S';
    return (<div className={css(styles.noDocs)}>
      <p>Your have saved no document yet</p>
      <p>Press <b>{shortcut}</b> on a webpage to save it</p>
      <p className={css(styles.tip)}>
        Tip: <a
          target="_blank"
          href="chrome://extensions/configureCommands"
          className={css(styles.tipLink)}
        >
         Click here to customize hotkeys
        </a>
      </p>
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
  },
  tip: {
    marginTop: 35,
    fontStyle: 'italic',
    textDecoration: 'inherit',
    ':hover': {
      textDecoration: 'underline',
    },
  },
  tipLink: {
    color: 'grey',
  }
});

SearchInput.propTypes = {
  query: PropTypes.string,
  storeLength: PropTypes.number,
  os: PropTypes.string,
  actions: PropTypes.shape({
    typeQuery: PropTypes.func,
  }),
};

export default SearchInput;
