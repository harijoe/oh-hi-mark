import chrome from './chrome';

import { setOs, setId, setEmail } from '../../app/actions/info';
export default (dispatch) => Promise.all([
  chrome.runtime.getPlatformInfo()
    .then(info => dispatch(setOs(info.os))),
  chrome.identity.getProfileUserInfo()
    .then((userInfo) => {
      dispatch(setId(userInfo.id));
      dispatch(setEmail(userInfo.email));
    })
]);
