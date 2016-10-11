import { wrapStore } from 'react-chrome-redux';
import runTabListeners from '../../app/services/tabs';
import runShortcutListeners from '../../app/services/shortcuts';
import { initIndex, loadIndex } from '../../app/services/elasticlunr';
import { INDEX_KEY } from '../../app/constants/Storage';
import { initApp } from '../../app/actions/current';

const createStore = require('../../app/store/configureStore');
const initialState = {};
const store = createStore(initialState);
wrapStore(store, { portName: 'APP' });

runShortcutListeners(store.dispatch);
runTabListeners(store.dispatch);

initIndex();

chrome.storage.local.get(INDEX_KEY, index => {
  if (index.INDEX_KEY !== undefined) {
    loadIndex(index.INDEX_KEY);
  }
  store.dispatch(initApp());
});
