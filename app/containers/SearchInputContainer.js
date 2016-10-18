import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchInput from '../components/SearchInput';
import * as SearchActions from '../actions/search';

export default connect(
  state => Object.assign({}, {
    storeLength: state.current.storeInfo.length,
  }),
  dispatch => ({ actions: bindActionCreators(Object.assign({},
    SearchActions,
  ), dispatch) })
)(SearchInput);
