import * as SearchActions from '../../app/actions/search';

export default (dispatch) => {
  document.onkeydown = (e) => {
    switch (e.keyCode) {
      case 37:
        dispatch(SearchActions.incrementSelected());
        break;
      case 38:
        dispatch(SearchActions.decrementSelected());
        break;
      case 39:
        dispatch(SearchActions.decrementSelected());
        break;
      case 40:
        dispatch(SearchActions.incrementSelected());
        break;
      case 13:
        dispatch(SearchActions.redirectToSelected());
        break;
      default:
        break;
    }
  };
};
