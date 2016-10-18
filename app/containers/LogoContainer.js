import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Logo from '../components/Logo';

export default connect(
  state => Object.assign({}, {
    hoveringSaveBtn: state.current.hoveringSaveBtn,
  }),
  dispatch => ({ actions: bindActionCreators(Object.assign({},
  ), dispatch) })
)(Logo);
