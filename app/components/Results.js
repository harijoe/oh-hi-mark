import React, { PropTypes } from 'react';
import { Table, TableBody, TableHeader,
  TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
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
                {result.date != null && moment(result.date).fromNow()}
              </TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <p className={css(styles.sync)}>
        <a
          className={css(styles.syncLink, styles.bottomText)}
          onClick={props.actions.requestToken}
        >
          Don't lose your marks, <b>click here</b> to back them up
        </a>
      </p>
      {/* target _blank required http://bit.ly/2e5RNt6 */}
      <p className={css(styles.productPain)}>
        <a
          className={css(styles.productPainLink, styles.bottomText)}
          href="https://productpains.com/product/oh-hi-mark"
          target="_blank"
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
  noResult: {
    textAlign: 'center',
    color: 'grey',
    height: 60,
    lineHeight: '60px',
  },
  productPain: {
    textAlign: 'right',
    display: 'inline-block',
    width: '50%',
    fontStyle: 'italic',
  },
  productPainLink: {
    color: 'grey',
    marginRight: 10,
  },
  productPainLogo: {
    height: 25,
    verticalAlign: 'middle',
  },
  sync: {
    display: 'inline-block',
    width: '50%',
    color: 'grey',
    fontStyle: 'italic',
  },
  syncLink: {
    marginLeft: 10,
    cursor: 'pointer',
  },
  bottomText: {
    textDecoration: 'inherit',
    ':hover': {
      textDecoration: 'underline',
    },
  }
});

Results.propTypes = {
  results: PropTypes.array,
  query: PropTypes.string,
  selected: PropTypes.number,
  selectedId: PropTypes.string,
  actions: PropTypes.object,
};

export default Results;
