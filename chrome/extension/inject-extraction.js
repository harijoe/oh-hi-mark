import { Store } from 'react-chrome-redux';
import * as Actions from '../../app/actions/current';
import unfluff from 'unfluff-without-node';
import _ from 'lodash';
import { toDataUrl } from '../../app/services/transformer';

const store = new Store({
  portName: 'APP'
});

const data = unfluff(document.documentElement.innerHTML, 'en');

const extraction = _.pick(data, [
  'title', 'author', 'description', 'text', 'publisher',
  'favicon'
]);
extraction.url = window.location.href;
extraction.authors = extraction.author.join(' ');
extraction.date = new Date().toISOString();

// Retrieve favicon in base64
toDataUrl(`https://www.google.com/s2/favicons?domain=${window.location.hostname}`, (base64Img) => {
  extraction.favicon = base64Img;
  store.dispatch(Actions.setExtraction(extraction));
});

