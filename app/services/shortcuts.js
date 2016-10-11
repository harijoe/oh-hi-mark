import * as CurrentActions from '../../app/actions/current';

export default (dispatch) => {
  chrome.commands.onCommand.addListener(() => {
    // TODO Discriminate commands here
    dispatch(CurrentActions.savePage());
  });
};
