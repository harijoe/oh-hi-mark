import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchInput from '../components/SearchInput';
import * as SearchActions from '../actions/search';

export default connect(
  state => Object.assign({}, {
    query: state.search.query,
  }),
  dispatch => ({ actions: bindActionCreators(Object.assign({},
    SearchActions,
  ), dispatch) })
)(SearchInput);
