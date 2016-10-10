import React, { PropTypes } from 'react';

function Results(props) {
  return (
    <ul>
      {props.results.map((result) => {
        return (
          <li>
            <a href={result.url}>
              {result.title}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

Results.propTypes = {
  results: PropTypes.array,
};

export default Results;
