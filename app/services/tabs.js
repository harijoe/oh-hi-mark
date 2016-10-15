import * as CurrentActions from '../../app/actions/current';
import _ from 'lodash';
import { IcurrentTabIdSelector } from '../selectors/current';
/*
    Values: active audible favIconUrl height highlighted id incognito index mutedInfo
            pinned selected status title url width windowId
 */
const handleChange = (store, tabId) => {
  chrome.tabs.get(tabId, (tabInfo) => {
    // if (tabInfo.status === 'complete') {
    store.dispatch(CurrentActions.setTab(_.pick(tabInfo, ['url', 'title', 'status', 'id'])));
    // }
  });
};

export default (store) => {
  chrome.tabs.onActivated.addListener(({ tabId }) => {
    handleChange(store, tabId);
  });
  chrome.tabs.onUpdated.addListener((tabId) => {
    const currentTabId = IcurrentTabIdSelector(store.getState());
    if (tabId !== currentTabId) {
      return;
    }
    handleChange(store, tabId);
  });
};
