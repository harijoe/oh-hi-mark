import { Store } from 'react-chrome-redux';
import * as Actions from '../../app/actions/current';
import unfluff from 'unfluff-without-node';

const store = new Store({
  portName: 'APP'
});

const data = unfluff(document.documentElement.innerHTML, 'en');
store.dispatch(Actions.setExtraction(data));
