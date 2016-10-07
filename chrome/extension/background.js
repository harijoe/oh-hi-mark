import { wrapStore } from 'react-chrome-redux';
import axios from 'axios';
import * as Actions from '../../app/actions/current';

const initialState = {};

const createStore = require('../../app/store/configureStore');

const store = createStore(initialState);

wrapStore(store, { portName: 'POPUP' });

store.dispatch(Actions.sayHello('Julien'));

chrome.tabs.onUpdated.addListener(() => {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    if (tabs.length === 0) return;
    axios.get('http://localhost:3000/js/inject.bundle.js')
      .then((result) => {
        chrome.tabs.executeScript(tabs[0].id, { code: result.data });
      });

  });
});

chrome.commands.onCommand.addListener(() => {
  store.dispatch(Actions.savePage());

  console.log('setting icon');
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    chrome.browserAction.setIcon({
      path: {
        16: 'img/icon/icon-16.png',
        48: 'img/icon/icon-48.png',
        128: 'img/icon/icon-128.png'
      },
      tabId: tabs[0].id
    });
  });
});
