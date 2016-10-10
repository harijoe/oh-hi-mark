import * as CurrentActions from '../../app/actions/current';
import _ from 'lodash';

/*
    Values: active audible favIconUrl height highlighted id incognito index mutedInfo
            pinned selected status title url width windowId
 */
export default (dispatch) => chrome.tabs.onActivated.addListener(({ tabId }) => {
  chrome.tabs.get(tabId, (tabInfo) => {
    // TODO Filter result
    dispatch(CurrentActions.setTab(_.pick(tabInfo, ['url', 'title', 'status'])));
  });
});
