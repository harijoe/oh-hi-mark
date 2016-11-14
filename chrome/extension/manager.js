import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import { Store } from 'react-chrome-redux';

const store = new Store({
  portName: 'APP'
});

const unsubscribe = store.subscribe(() => {
  unsubscribe(); // make sure to only fire once
  ReactDOM.render(
    <Provider store={store}>
      <MuiThemeProvider>
        <div>Hello</div>
      </MuiThemeProvider>
    </Provider>,
    document.querySelector('#root')
  );
});
