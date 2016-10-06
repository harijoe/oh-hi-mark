import { wrapStore } from 'react-chrome-redux';
import * as Actions from '../../app/actions/todos';

const initialState = {};

const createStore = require('../../app/store/configureStore');

const store = createStore(initialState);

wrapStore(store, { portName: 'POPUP' });

store.dispatch(Actions.sayHello('Julien'));
