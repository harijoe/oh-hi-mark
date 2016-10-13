import React, { PropTypes } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { StyleSheet, css } from 'aphrodite';
import { cleanUrl } from '../services/util';
import moment from 'moment';

function Results(props) {
  if (props.query === '') {
    return false;
  }

  if (props.results.length === 0) {
    return <p className={css(styles.noResult)}>No result</p>;
  }

  const onRowOver = (id) => () => {
    if (props.selected !== id) {
      props.actions.setSelected(id);
    }
  };

  const onClick = () => {
    props.actions.redirectToSelected();
  };

  return (
    <Table>
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow>
          <TableHeaderColumn style={{ width: '7%' }}>Logo</TableHeaderColumn>
          <TableHeaderColumn style={{ width: '45%' }}>Title</TableHeaderColumn>
          <TableHeaderColumn style={{ width: '25%' }}>Url</TableHeaderColumn>
          <TableHeaderColumn style={{ width: '23%' }}>Added</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false} deselectOnClickaway={false}>
        {props.results.map((result, index) => (
          <TableRow
            key={result.id}
            selected={result.id === props.selectedId}
            onMouseMove={onRowOver(index)}
            onClick={onClick}
            selectable={false}
            className={css(styles.tableRow)}
          >
            <TableRowColumn style={{ width: '7%' }}>
              <img alt={result.title} src={result.favicon} />
            </TableRowColumn>
            <TableRowColumn style={{ width: '45%' }}>
              {result.title}
            </TableRowColumn>
            <TableRowColumn style={{ width: '25%' }}>
              {cleanUrl(result.url).split('/')[0]}
            </TableRowColumn>
            <TableRowColumn style={{ width: '23%' }}>
              {moment(result.date).fromNow()}
            </TableRowColumn>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

const styles = StyleSheet.create({
  tableRow: {
    cursor: 'pointer',
  },
  noResult: {
    textAlign: 'center',
    color: 'grey',
  }
});

Results.propTypes = {
  results: PropTypes.array,
  query: PropTypes.string,
  selected: PropTypes.string,
  selectedId: PropTypes.string,
  actions: PropTypes.object,
};

export default Results;
