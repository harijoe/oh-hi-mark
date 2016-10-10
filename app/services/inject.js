import axios from 'axios';

export default () => {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    if (tabs.length === 0) return;
    axios.get('http://localhost:3000/js/inject.bundle.js')
      .then((result) => {
        chrome.tabs.executeScript(tabs[0].id, { code: result.data });
      });
  });
};
