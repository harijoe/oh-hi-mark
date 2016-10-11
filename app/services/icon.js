const pathSaved = {
  // 16: 'img/icon/icon-saved-16.png',
  48: 'img/icon/icon-saved-48.png',
  128: 'img/icon/icon-saved-128.png'
};

const pathDefault = {
  // 16: 'img/icon/icon-16.png',
  48: 'img/icon/icon-48.png',
  128: 'img/icon/icon-128.png'
};

export const setIcon = (saved = false) => {
  const path = saved ? pathSaved : pathDefault;

  return chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    chrome.browserAction.setIcon({
      path,
      tabId: tabs[0].id
    });
  });
};
