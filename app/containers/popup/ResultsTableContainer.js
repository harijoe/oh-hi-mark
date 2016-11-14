import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ResultsTable from '../../components/popup/ResultsTable';
import { selectedIdSelector } from '../../selectors/search';
import * as SearchActions from '../../actions/search';

export default connect(
  state => Object.assign({}, {
    selected: state.search.selected,
  }),
  dispatch => ({ actions: bindActionCreators(Object.assign({},
    SearchActions,
  ), dispatch) })
)(ResultsTable);
