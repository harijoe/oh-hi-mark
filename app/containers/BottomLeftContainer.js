import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BottomLeft from '../components/BottomLeft';
import * as InfoActions from '../actions/info';

export default connect(
  state => Object.assign({}, {
    token: state.info.token,
    synced: state.current.synced,
  }),
  dispatch => ({ actions: bindActionCreators(Object.assign({},
    InfoActions,
  ), dispatch) })
)(BottomLeft);
