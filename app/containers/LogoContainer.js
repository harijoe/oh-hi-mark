import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Logo from '../components/Logo';
import * as CurrentActions from '../actions/current';

export default connect(
  state => Object.assign({}, {
    showTooltip: state.current.showTooltip,
  }),
  dispatch => ({ actions: bindActionCreators(Object.assign({},
    CurrentActions,
  ), dispatch) })
)(Logo);
