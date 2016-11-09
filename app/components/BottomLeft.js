import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';

function BottomLeft(props) {
  if (props.token != null) {
    return (<p className={css(styles.sync)}>
      <span className={css(styles.backedup)}>Marks successfully backed up</span>
    </p>);
  }
  return (<p className={css(styles.sync)}>
    <a
      className={css(styles.syncLink, styles.bottomText)}
      onClick={props.actions.requestToken}
    >
      Don't lose your marks, <b>click here</b> to back them up
    </a>
  </p>);
}
const styles = StyleSheet.create({
  sync: {
    display: 'inline-block',
    width: '50%',
    color: 'grey',
    fontStyle: 'italic',
    marginBottom: 0,
  },
  syncLink: {
    marginLeft: 10,
    cursor: 'pointer',
  },
  bottomText: {
    textDecoration: 'inherit',
    ':hover': {
      textDecoration: 'underline',
    },
  },
  backedup: {
    color: 'darkGreen',
    marginLeft: 10,
    opacity: '0.6',
  },
});

BottomLeft.propTypes = {
  token: PropTypes.string,
  actions: PropTypes.object,
};

export default BottomLeft;
