import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';

function NoDocument(props) {
  const shortcut = props.os === 'mac' ? 'Command+Shift+S' : 'Ctrl+Shift+S';
  return (<div className={css(styles.noDocs)}>
    <p>Your have saved no document yet</p>
    <p>Press <b>{shortcut}</b> or <a
      target="_blank"
      onClick={props.actions.savePage}
      className={css(styles.tipLink)}>click here</a> to save this page</p>
    <p className={css(styles.tip)}>
      Tip: <a
        target="_blank"
        rel="noopener noreferrer"
        href="chrome://extensions/configureCommands"
        className={css(styles.tipLink)}
      >Click here to customize hotkeys</a> or <a
        className={css(styles.tipLink)}
        onClick={props.actions.requestToken}
      >here to connect your stored marks</a>
    </p>
  </div>);
}

const styles = StyleSheet.create({
  noDocs: {
    textAlign: 'center',
    color: 'grey',
  },
  tip: {
    marginTop: 35,
    fontStyle: 'italic',
    textDecoration: 'none',
  },
  tipLink: {
    color: 'grey',
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  }
});

NoDocument.propTypes = {
  os: PropTypes.string,
  actions: PropTypes.obj,
};

export default NoDocument;
