import { Store } from 'react-chrome-redux';
import * as Actions from '../../app/actions/current';

const store = new Store({
  portName: 'POPUP'
});

store.dispatch(Actions.setContent(document.documentElement.innerHTML));

// chrome.extension.sendRequest({ message: store }, (json) => {
//   alert(json.message);
// });

