export const getAuthToken = (id, interactive = true) => new Promise((resolve) => {
  try {
    chrome.identity.getAuthToken({
      interactive,
      account: {
        id,
      }
    }, (token) => {
      resolve(token);
    });
  } catch (e) {
    resolve(null);
  }
});

export const getIdentity = () => chrome.identity.getProfileUserInfo(userInfo => userInfo);
