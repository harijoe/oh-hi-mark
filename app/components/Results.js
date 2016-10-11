import React, { PropTypes } from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';

function Results(props) {
  if (props.query === '') {
    return false;
  }

  if (props.results.length === 0) {
    return <p>No result</p>;
  }

  return (
    <Table>
      <TableHeader displaySelectAll={false}>
        <TableRow>
          <TableHeaderColumn>Title</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false} deselectOnClickaway={false}>
        {props.results.map((result) => (
          <TableRow key={result.id} selected={result.id === props.selectedId}>
            <TableRowColumn>
              <a href={result.url}>
                {result.title}
              </a>
            </TableRowColumn>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

Results.propTypes = {
  results: PropTypes.array,
  query: PropTypes.string,
  selectedId: PropTypes.string,
};

export default Results;
