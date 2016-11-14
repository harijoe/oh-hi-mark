import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import LinearProgress from 'material-ui/LinearProgress';

function BottomLeft(props) {
  /*
     TODO
     We shouldn't check only the token
     Marks are "synced" if they were actually retrieved from AWS
   */
  if (props.token != null) {
    if (props.synced === null) {
      return (<p className={css(styles.sync)}>
        <LinearProgress className={css(styles.linearProgress)} mode="indeterminate" />
      </p>);
    }

    if (props.synced === true) {
      return (<p className={css(styles.sync)}>
        <span className={css(styles.synced)}>Marks successfully synchronized</span>
      </p>);
    }

    return (<p className={css(styles.sync)}>
      <span className={css(styles.notSynced)}>Marks not synchronized</span>
    </p>);
  }
  return (<p className={css(styles.sync)}>
    <a
      className={css(styles.syncLink, styles.bottomText)}
      onClick={props.actions.requestToken}
    >
      Don't lose your marks! <b>click here</b> to store them in the cloud
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
    color: 'red',
  },
  bottomText: {
    textDecoration: 'inherit',
    ':hover': {
      textDecoration: 'underline',
    },
  },
  synced: {
    color: 'darkGreen',
    marginLeft: 10,
    opacity: '0.6',
  },
  notSynced: {
    color: 'grey',
    marginLeft: 10,
    opacity: '0.6',
  },
  linearProgress: {
    width: 180,
    marginLeft: 10,
  }
});

BottomLeft.propTypes = {
  token: PropTypes.string,
  synced: PropTypes.bool,
  actions: PropTypes.object,
};

export default BottomLeft;
