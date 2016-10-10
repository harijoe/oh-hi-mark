import { wrapStore } from 'react-chrome-redux';
import axios from 'axios';
// import * as CurrentActions from '../../app/actions/current';
import runTabListeners from '../../app/services/tabs';
import runShortcutListeners from '../../app/services/shortcuts';
import { initIndex, loadIndex } from '../../app/services/elasticlunr';
import { INDEX_KEY } from '../../app/constants/Storage';
const createStore = require('../../app/store/configureStore');
const initialState = {};
const store = createStore(initialState);
wrapStore(store, { portName: 'APP' });

runShortcutListeners(store.dispatch);
runTabListeners(store.dispatch);

initIndex();
// TODO Put it in a dedicated service
chrome.storage.local.get(INDEX_KEY, index =>
  (index.INDEX_KEY !== undefined ? loadIndex(index.INDEX_KEY) : false)
);
