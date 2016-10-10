import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'react-chrome-redux';
import Root from '../../app/components/Root';
import { resetPopup } from '../../app/actions/search';

const store = new Store({
  portName: 'APP'
});

store.dispatch(resetPopup());

const unsubscribe = store.subscribe(() => {
  unsubscribe(); // make sure to only fire once
  ReactDOM.render(
    <Provider store={store}>
      <Root />
    </Provider>,
    document.querySelector('#root')
  );
});
