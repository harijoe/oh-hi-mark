import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SaveButton from '../components/SaveButton';
import * as CurrentActions from '../actions/current';

export default connect(
  state => Object.assign({}, {
    saved: state.current.saved,
    forbiddenURL: state.current.forbiddenURL,
  }),
  dispatch => ({ actions: bindActionCreators(Object.assign({},
    CurrentActions,
  ), dispatch) })
)(SaveButton);
