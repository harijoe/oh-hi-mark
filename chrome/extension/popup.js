import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'react-chrome-redux';
import RootContainer from '../../app/containers/RootContainer';

const store = new Store({
  portName: 'POPUP'
});

const unsubscribe = store.subscribe(() => {
  unsubscribe(); // make sure to only fire once
  ReactDOM.render(
    <Provider store={store}>
      <RootContainer />
    </Provider>,
    document.querySelector('#root')
  );
});
