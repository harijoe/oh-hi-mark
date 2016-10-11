import { Store } from 'react-chrome-redux';
import * as Actions from '../../app/actions/current';
import unfluff from 'unfluff-without-node';
import _ from 'lodash';

const store = new Store({
  portName: 'APP'
});

const data = unfluff(document.documentElement.innerHTML, 'en');

const extraction = _.pick(data, ['title', 'author', 'description', 'text', 'publisher']);
extraction.url = window.location.href;
extraction.authors = extraction.author.join(' ');

store.dispatch(Actions.setExtraction(extraction));
