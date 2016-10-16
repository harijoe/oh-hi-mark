import { setOs, setId, setEmail } from '../../app/actions/info';

export default (dispatch) => {
  chrome.runtime.getPlatformInfo((info) => {
    dispatch(setOs(info.os));
  });
  chrome.identity.getProfileUserInfo(userInfo => {
    dispatch(setEmail(userInfo.email));
    dispatch(setId(userInfo.id));
  });
};
