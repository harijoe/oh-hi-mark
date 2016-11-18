import React, { PropTypes } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import DoneIcon from 'material-ui/svg-icons/action/done';
import { StyleSheet, css } from 'aphrodite';

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
        <AddIcon />
      </FloatingActionButton>
    );
  }

  if (props.saved) {
    return (<FloatingActionButton
      mini
      className={css(styles.button)}
      disabled
    >
      <DoneIcon />
    </FloatingActionButton>);
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
