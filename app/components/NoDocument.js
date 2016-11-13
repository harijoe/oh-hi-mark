import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';

function NoDocument(props) {
  // const shortcut = props.os === 'mac' ? 'Command+Shift+S' : 'Ctrl+Shift+S';
  return (<div className={css(styles.noDocs)}>
    <p>Hi there, It's time to save your first document!</p>
    <p className={css(styles.tip)}><b>Click on the big blue button</b></p>
  </div>);
}

const styles = StyleSheet.create({
  noDocs: {
    textAlign: 'center',
    color: 'grey',
  },
  tip: {
    marginTop: 35,
  },
});

NoDocument.propTypes = {
  os: PropTypes.string,
};

export default NoDocument;
