import * as CurrentActions from '../../app/actions/current';
import _ from 'lodash';

/*
    Values: active audible favIconUrl height highlighted id incognito index mutedInfo
            pinned selected status title url width windowId
 */
const handleChange = (dispatch, tabId) => {
  chrome.tabs.get(tabId, (tabInfo) => {
    if (tabInfo.status === 'complete') {
      dispatch(CurrentActions.setTab(_.pick(tabInfo, ['url', 'title', 'status', 'id'])));
    }
  });
};

export default (dispatch) => {
  chrome.tabs.onActivated.addListener(({ tabId }) => {
    handleChange(dispatch, tabId);
  });
  chrome.tabs.onUpdated.addListener((tabId) => {
    handleChange(dispatch, tabId);
  });
};
