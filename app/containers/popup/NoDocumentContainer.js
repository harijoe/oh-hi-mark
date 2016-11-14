import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NoDocument from '../../components/popup/NoDocument';

export default connect(
  state => Object.assign({}, {
    os: state.info.os,
  }),
  dispatch => ({ actions: bindActionCreators(Object.assign({},
  ), dispatch) })
)(NoDocument);
