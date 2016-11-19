import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import ForbiddenIcon from 'material-ui/svg-icons/av/not-interested';
import SavedButton from './SavedButton';

function SaveButton(props) {
  const handleSaveBtnClick = () => {
    props.actions.setShowTooltip(true);
    props.actions.savePage();
  };

  if (props.forbiddenURL) {
    return (
      <FloatingActionButton
        mini
        className={css(styles.button)}
        disabled
      >
        <ForbiddenIcon />
      </FloatingActionButton>
    );
  }

  if (props.saved) {
    return (<SavedButton
      className={css(styles.button)}
      removePage={props.actions.removePage}
    />);
  }
  return (
    <FloatingActionButton
      mini
      className={css(styles.button)}
      onClick={handleSaveBtnClick}
    >
      <AddIcon />
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
  forbiddenURL: PropTypes.bool,
  actions: PropTypes.object,
};

export default SaveButton;

