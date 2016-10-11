import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Results from '../components/Results';
import { selectedIdSelector } from '../selectors/search';

export default connect(
  state => Object.assign({}, {
    query: state.search.query,
    results: state.search.results,
    selectedId: selectedIdSelector(state),
  }),
  dispatch => ({ actions: bindActionCreators(Object.assign({},
  ), dispatch) })
)(Results);
