import React, { PropTypes } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { StyleSheet, css } from 'aphrodite';

function Results(props) {
  if (props.query === '') {
    return false;
  }

  if (props.results.length === 0) {
    return <p className={css(styles.noResult)}>No result</p>;
  }

  const onRowOver = (id) => () => {
    props.actions.setSelected(id);
  };

  const onClick = () => {
    props.actions.redirectToSelected();
  };

  return (
    <Table>
      <TableHeader displaySelectAll={false}>
        <TableRow>
          <TableHeaderColumn>Title</TableHeaderColumn>
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
            <TableRowColumn>
              {result.title}
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
  selectedId: PropTypes.string,
  actions: PropTypes.obj,
};

export default Results;
