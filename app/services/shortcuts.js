import * as CurrentActions from '../../app/actions/current';

export default (dispatch) => {
  chrome.commands.onCommand.addListener(() => {
    dispatch(CurrentActions.savePage());
  });
};
