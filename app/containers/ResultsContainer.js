import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Results from '../components/Results';
import { selectedIdSelector } from '../selectors/search';
import * as SearchActions from '../actions/search';

export default connect(
  state => Object.assign({}, {
    query: state.search.query,
    results: state.search.results,
    storeLength: state.current.storeInfo.length,
    selected: state.search.selected,
    selectedId: selectedIdSelector(state),
  }),
  dispatch => ({ actions: bindActionCreators(Object.assign({},
    SearchActions,
  ), dispatch) })
)(Results);
