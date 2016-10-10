import * as CurrentActions from '../../app/actions/current';

export default (dispatch) => {
  chrome.commands.onCommand.addListener((command) => {
    console.log('running command', command); // TODO Discriminate commands here
    dispatch(CurrentActions.savePage());
  });
};
