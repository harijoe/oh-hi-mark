import React, { PropTypes } from 'react';

function Results(props) {
  return (
    <ul>
      {props.results.map((result) => {
        return (
          <li key={result.id}>
            <a href={result.url}>
              {result.title} {result.id === props.selectedId && '- selected'}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

Results.propTypes = {
  results: PropTypes.array,
  selectedId: PropTypes.string,
};

export default Results;
