import { setOs } from '../../app/actions/info';

export default (dispatch) => {
  chrome.runtime.getPlatformInfo((info) => {
    dispatch(setOs(info.os));
  });
};
