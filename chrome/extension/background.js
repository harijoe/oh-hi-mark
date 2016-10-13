import { wrapStore } from 'react-chrome-redux';
import runTabListeners from '../../app/services/tabs';
import runShortcutListeners from '../../app/services/shortcuts';
import { initIndex, loadIndex } from '../../app/services/elasticlunr';
import { getIndexKey } from '../../app/services/storage';
import { initApp } from '../../app/actions/current';
import { resetPopup } from '../../app/actions/search';

const createStore = require('../../app/store/configureStore');
const initialState = {};
const store = createStore(initialState);
wrapStore(store, { portName: 'APP' });

runShortcutListeners(store.dispatch);
runTabListeners(store.dispatch);

initIndex();

// A little weird, would deserve some refacto
chrome.storage.local.get(getIndexKey(), index => {
  if (index[getIndexKey()] !== undefined) {
    loadIndex(index[getIndexKey()]);
  }
  store.dispatch(initApp());
});

const connect = chrome.runtime.connect();
connect.onDisconnect.addListener(() => {
  store.dispatch(resetPopup());
});

// Try to add a listener to the store to this if it's immutable data
// Suspect redux saga
