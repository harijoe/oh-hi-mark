import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BottomLeft from '../components/BottomLeft';
import * as AuthActions from '../actions/auth';

export default connect(
  state => Object.assign({}, {
    token: state.auth.token,
  }),
  dispatch => ({ actions: bindActionCreators(Object.assign({},
    AuthActions,
  ), dispatch) })
)(BottomLeft);
