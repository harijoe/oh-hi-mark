import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Results from '../components/Results';

export default connect(
  state => Object.assign({}, {
    results: state.search.results,
  }),
  dispatch => ({ actions: bindActionCreators(Object.assign({},
  ), dispatch) })
)(Results);
