import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NoDocument from '../components/NoDocument';
import * as AuthActions from '../actions/auth';
import * as CurrentActions from '../actions/current';

export default connect(
  state => Object.assign({}, {
    os: state.info.os,
  }),
  dispatch => ({ actions: bindActionCreators(Object.assign({},
    AuthActions,
    CurrentActions,
  ), dispatch) })
)(NoDocument);
