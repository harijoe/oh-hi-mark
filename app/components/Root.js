import React, { PropTypes } from 'react';

function Root(props) {
  return (
    <p>
      Hello {props.message != null ? props.message : 'world!'}
    </p>
  );
}

Root.propTypes = {
  message: PropTypes.string,
};

export default Root;
