export const getAuthToken = (id) => new Promise((resolve, reject) => {
  try {
    chrome.identity.getAuthToken({
      interactive: true,
      account: {
        id,
      }
    }, token => {
      resolve(token);
    });
  } catch (e) {
    reject(e.message);
  }
});
