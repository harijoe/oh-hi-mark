import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
function Logo(props) {
  if (props.hoveringSaveBtn) {
    return (<p className={css(styles.tooltip)}>
      <b>Tip:</b> Be faster, use a shortcut next time!
    </p>);
  }
  return (
    <img className={css(styles.inapp)} alt="Oh, hi mark!" src="img/inapp.png" />
  );
}

Logo.propTypes = {
  hoveringSaveBtn: PropTypes.bool,
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
  }
});


export default Logo;
