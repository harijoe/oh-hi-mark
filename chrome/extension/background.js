import { wrapStore } from 'react-chrome-redux';
import runTabListeners from '../../app/services/tabs';
import runShortcutListeners from '../../app/services/shortcuts';
import { initIndex, loadIndex } from '../../app/services/elasticlunr';
import initInfo from '../../app/services/info';
import { INDEX_KEY } from '../../app/constants/Storage';
import { initApp } from '../../app/actions/current';

const createStore = require('../../app/store/configureStore');

const initialState = {};
const store = createStore(initialState);
wrapStore(store, { portName: 'APP' });

runShortcutListeners(store.dispatch);
runTabListeners(store.dispatch, store.getState);

initInfo(store.dispatch);
initIndex();

chrome.storage.local.get(INDEX_KEY, (index) => {
  loadIndex(index[INDEX_KEY]);
  store.dispatch(initApp());
});

// Try to add a listener to the store to this if it's immutable data
// Suspect redux saga
