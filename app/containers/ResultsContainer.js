import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Results from '../components/Results';
import { selectedIdSelector } from '../selectors/search';
import * as AuthActions from '../actions/auth';
import * as SearchActions from '../actions/search';

export default connect(
  state => Object.assign({}, {
    query: state.search.query,
    results: state.search.results,
    selected: state.search.selected,
    selectedId: selectedIdSelector(state),
  }),
  dispatch => ({ actions: bindActionCreators(Object.assign({},
    AuthActions,
    SearchActions,
  ), dispatch) })
)(Results);
