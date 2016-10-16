import * as CurrentActions from '../../app/actions/current';
import _ from 'lodash';
import { IcurrentTabIdSelector } from '../selectors/current';
/*
    Values: active audible favIconUrl height highlighted id incognito index mutedInfo
            pinned selected status title url width windowId
 */
const handleChange = (dispatch, tabId) => {
  chrome.tabs.get(tabId, (tabInfo) => {
    dispatch(CurrentActions.setTab(_.pick(tabInfo, ['url', 'title', 'status', 'id'])));
  });
};

export default (dispatch, state) => {
  chrome.tabs.onActivated.addListener(({ tabId }) => {
    handleChange(dispatch, tabId);
  });
  chrome.tabs.onUpdated.addListener((tabId) => {
    const currentTabId = IcurrentTabIdSelector(state);
    if (tabId !== currentTabId) {
      return;
    }
    handleChange(dispatch, tabId);
  });
};
