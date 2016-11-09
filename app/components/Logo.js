import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';

function Logo(props) {
  if (props.showTooltip) {
    const goToConfigureCommands = () => {
      chrome.tabs.update({ url: 'chrome://extensions/configureCommands' });
      props.actions.setShowTooltip(false);
      window.close();
    };

    return (<p className={css(styles.tooltip)}>
      <b>Tip:</b> Be faster next time <br />
      <a
        href="#"
        className={css(styles.shortcutLink)}
        onClick={goToConfigureCommands}
      >use a shortcut!</a>
    </p>);
  }
  return (
    <img className={css(styles.inapp)} alt="Oh, hi mark!" src="img/inapp.png" />
  );
}

Logo.propTypes = {
  showTooltip: PropTypes.bool,
  actions: PropTypes.object,
};


const styles = StyleSheet.create({
  inapp: {
    height: 45,
    verticalAlign: 'middle',
  },
  link: {
    color: 'grey',
  },
  tooltip: {
    display: 'inline-block',
    verticalAlign: 'middle',
    textAlign: 'center',
    width: 167, // Width of the logo
    color: 'white',
    backgroundColor: '#737373',
    margin: 0,
    marginLeft: 19,
    borderRadius: 9,
    padding: 5,
  },
  shortcutLink: {
    color: 'yellow',
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline'
    }
  },
});


export default Logo;
