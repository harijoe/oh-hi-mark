import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import { Store } from 'react-chrome-redux';
import ManagerRoot from '../../app/components/manager/ManagerRoot';
const store = new Store({
  portName: 'APP'
});

const unsubscribe = store.subscribe(() => {
  unsubscribe(); // make sure to only fire once
  ReactDOM.render(
    <Provider store={store}>
      <MuiThemeProvider>
        <ManagerRoot />
      </MuiThemeProvider>
    </Provider>,
    document.querySelector('#root')
  );
});
