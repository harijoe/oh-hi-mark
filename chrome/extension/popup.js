import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'react-chrome-redux';
import RootContainer from '../../app/containers/RootContainer';
import * as Actions from '../../app/actions/current';

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

store.dispatch(Actions.sayHello('Clelia'));
