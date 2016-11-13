const pathSaved = {
  48: 'img/icon/icon-saved-48.png',
  128: 'img/icon/icon-saved-128.png'
};

const pathDefault = {
  48: 'img/icon/icon-48.png',
  128: 'img/icon/icon-128.png'
};

export const setIcon = (saved = false) => {
  const path = saved ? pathSaved : pathDefault;

  return chrome.browserAction.setIcon({
    path
  });
};
