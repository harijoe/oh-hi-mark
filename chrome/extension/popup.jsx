import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'react-chrome-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import runKeypressListeners from '../../app/services/keypress';
import PopupRoot from '../../app/components/popup/PopupRoot';
import { resetPopup } from '../../app/actions/search';

const store = new Store({
  portName: 'APP'
});

store.dispatch(resetPopup());
runKeypressListeners(store.dispatch);

const unsubscribe = store.subscribe(() => {
  unsubscribe(); // make sure to only fire once
  ReactDOM.render(
    <Provider store={store}>
      <MuiThemeProvider>
        <PopupRoot />
      </MuiThemeProvider>
    </Provider>,
    document.querySelector('#root')
  );
});
