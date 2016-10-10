import axios from 'axios';

export default () => {
  let injectPath = 'http://localhost:3000/js/inject.bundle.js';
  if (process.env.NODE_ENV === 'production') {
    injectPath = '/js/inject.bundle.js';
  }
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    if (tabs.length === 0) return;
    axios.get(injectPath)
      .then((result) => {
        chrome.tabs.executeScript(tabs[0].id, { code: result.data });
      });
  });
};
