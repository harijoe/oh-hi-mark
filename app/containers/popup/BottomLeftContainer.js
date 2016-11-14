import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BottomLeft from '../../components/popup/BottomLeft';
import * as InfoActions from '../../actions/info';

export default connect(
  state => Object.assign({}, {
    token: state.info.token,
    synced: state.store.synced,
  }),
  dispatch => ({ actions: bindActionCreators(Object.assign({},
    InfoActions,
  ), dispatch) })
)(BottomLeft);
