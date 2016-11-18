import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import { grey600 } from 'material-ui/styles/colors';
import { StyleSheet, css } from 'aphrodite';
import { extensionID } from '../../constants/Config';

function FlatButtonExampleIcon() {
  const handleClick = () => {
    const managerURL = `chrome-extension://${extensionID}/manager.html`;
    chrome.tabs.create({ url: managerURL });
  };
  return (
    <span className={css(styles.wrapper)}>
      <FlatButton
        icon={<ActionSettings color={grey600} />}
        className={css(styles.logo)}
        onClick={handleClick}
      />
    </span>
  );
}

const styles = StyleSheet.create({
  logo: {
    display: 'inlineBlock',
  },
  wrapper: {
    width: '10%',
  },
});

export default FlatButtonExampleIcon;
