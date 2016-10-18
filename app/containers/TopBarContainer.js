import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TopBar from '../components/TopBar';

export default connect(
  state => Object.assign({}, {
    storeLength: state.current.storeInfo.length,
  }),
  dispatch => ({ actions: bindActionCreators(Object.assign({},
  ), dispatch) })
)(TopBar);
