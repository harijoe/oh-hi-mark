import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Table, TableBody, TableHeader,
  TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import moment from 'moment';
import BottomRight from './BottomRight';
import { cleanUrl } from '../services/util';
import BottomLeftContainer from '../containers/BottomLeftContainer';

function ResultsTable(props) {
  const onRowOver = id => () => {
    if (props.selected !== id) {
      props.actions.setSelected(id);
    }
  };

  const onClick = () => {
    props.actions.redirectToSelected();
  };

  if (props.results[props.selected] == null) {
    return false;
  }
  const selectedId = props.results[props.selected].id;
  const latestResultsStyle = props.isLatestResults ? { color: 'grey' } : {};

  return (
    <div>
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
              selected={result.id === selectedId}
              onMouseMove={onRowOver(index)}
              onClick={onClick}
              selectable={false}
              className={css(styles.tableRow)}
            >
              <TableRowColumn style={{ width: '7%' }}>
                <img alt={result.title} src={result.favicon} />
              </TableRowColumn>
              <TableRowColumn style={Object.assign({}, { width: '45%' }, latestResultsStyle)}>
                {result.title}
              </TableRowColumn>
              <TableRowColumn style={Object.assign({}, { width: '25%' }, latestResultsStyle)}>
                {cleanUrl(result.url).split('/')[0]}
              </TableRowColumn>
              <TableRowColumn style={Object.assign({}, { width: '23%' }, latestResultsStyle)}>
                {result.date != null && moment(result.date).fromNow()}
              </TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <BottomLeftContainer />
      {/* target _blank required http://bit.ly/2e5RNt6 */}
      <BottomRight />
    </div>
  );
}


const styles = StyleSheet.create({
  tableRow: {
    cursor: 'pointer',
  },
});

ResultsTable.propTypes = {
  results: PropTypes.array,
  isLatestResults: PropTypes.bool,
  selected: PropTypes.number,
  actions: PropTypes.object,
};

export default ResultsTable;
