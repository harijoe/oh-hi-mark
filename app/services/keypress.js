import * as SearchActions from '../../app/actions/search';

export default (dispatch) => {
  console.log('DONE!');
  document.onkeydown = (e) => {
    switch (e.keyCode) {
      case 37:
        console.log('left');
        dispatch(SearchActions.incrementSelected());
        break;
      case 38:
        console.log('up');
        dispatch(SearchActions.decrementSelected());
        break;
      case 39:
        console.log('right');
        dispatch(SearchActions.decrementSelected());
        break;
      case 40:
        console.log('down');
        dispatch(SearchActions.incrementSelected());
        break;
      case 13:
        console.log('enter');
        dispatch(SearchActions.redirectToSelected());
        break;
      default:
        break;
    }
  };
};
