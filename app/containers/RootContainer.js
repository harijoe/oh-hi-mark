import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Root from '../components/Root';

export default connect(
  state => Object.assign({},
    { message: state.todos.message }
  ),
  dispatch => ({ actions: bindActionCreators(Object.assign({},
  ), dispatch) })
)(Root);
