import { wrapStore } from 'react-chrome-redux';
import runTabListeners from '../../app/services/tabs';
import runShortcutListeners from '../../app/services/shortcuts';
import initInfo from '../../app/services/info';
import { initApp } from '../../app/actions/current';

const createStore = require('../../app/store/configureStore');

const initialState = {};
const store = createStore(initialState);
wrapStore(store, { portName: 'APP' });

runShortcutListeners(store.dispatch);
runTabListeners(store.dispatch, store.getState);

initInfo(store.dispatch)
  .then(() => store.dispatch(initApp()))
;

// Try to add a listener to the store to this if it's immutable data
// Suspect redux saga
