import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Results from '../components/Results';

export default connect(
  state => Object.assign({}, {
    query: state.search.query,
    results: state.search.results,
    latestResults: state.search.latestResults,
    storeLength: state.current.storeInfo.length,
  }),
  dispatch => ({ actions: bindActionCreators(Object.assign({},
  ), dispatch) })
)(Results);
