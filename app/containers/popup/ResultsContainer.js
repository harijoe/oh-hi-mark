import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Results from '../../components/popup/Results';

export default connect(
  state => Object.assign({}, {
    query: state.search.query,
    results: state.search.results,
    latestResults: state.search.latestResults,
    storeLength: state.store.storeInfo.length,
  }),
  dispatch => ({ actions: bindActionCreators(Object.assign({},
  ), dispatch) })
)(Results);
