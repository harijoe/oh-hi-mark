import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Table, TableBody, TableHeader,
  TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import moment from 'moment';
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
      <p className={css(styles.productPain)}>
        <a
          className={css(styles.productPainLink, styles.bottomText)}
          href="https://productpains.com/product/oh-hi-mark"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className={css(styles.productPainLogo)}
            alt="productpains.com"
            src="img/productpain.png"
          />
          Something is missing ? Vote for the next feature!
        </a>
      </p>
    </div>
  );
}


const styles = StyleSheet.create({
  tableRow: {
    cursor: 'pointer',
  },
  productPain: {
    textAlign: 'right',
    display: 'inline-block',
    width: '50%',
    fontStyle: 'italic',
    marginBottom: 0,
  },
  productPainLink: {
    color: 'grey',
    marginRight: 10,
  },
  productPainLogo: {
    height: 25,
    verticalAlign: 'middle',
  },
  bottomText: {
    textDecoration: 'inherit',
    ':hover': {
      textDecoration: 'underline',
    },
  }
});

ResultsTable.propTypes = {
  results: PropTypes.array,
  isLatestResults: PropTypes.bool,
  selected: PropTypes.number,
  actions: PropTypes.object,
};

export default ResultsTable;
