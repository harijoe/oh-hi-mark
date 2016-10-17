import React, { PropTypes } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import BookmarkIcon from 'material-ui/svg-icons/action/bookmark';
import DoneIcon from 'material-ui/svg-icons/action/done';
import { StyleSheet, css } from 'aphrodite';

function SaveButton(props) {
  if (props.saved) {
    return (<FloatingActionButton
      mini
      className={css(styles.button)}
      onClick={props.actions.savePage()}
      disabled
    >
      <DoneIcon />
    </FloatingActionButton>);
  }
  return (
    <FloatingActionButton
      mini
      className={css(styles.button)}
      onClick={props.actions.savePage}
      onMouseEnter={() => props.actions.setHoveringSaveBtn(true)}
      onMouseLeave={() => props.actions.setHoveringSaveBtn(false)}
    >
      <BookmarkIcon />
    </FloatingActionButton>
  );
}

const styles = StyleSheet.create({
  button: {
    verticalAlign: 'middle',
    marginLeft: 6,
    marginBottom: 4,
  },
});

SaveButton.propTypes = {
  saved: PropTypes.bool,
  actions: PropTypes.object,
};

export default SaveButton;

