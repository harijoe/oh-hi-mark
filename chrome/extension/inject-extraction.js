import { Store } from 'react-chrome-redux';
import * as Actions from '../../app/actions/current';
import parseContent from 'parse-content.js';
import { toDataUrl } from '../../app/services/transformer';

const store = new Store({
  portName: 'APP'
});

const extraction = parseContent(document.documentElement.innerHTML);

extraction.url = window.location.href;
extraction.date = new Date().toISOString();

console.log(extraction);

// Retrieve favicon in base64
// TODO should be retrieved directly from the page to prevent offline problems
toDataUrl(`https://www.google.com/s2/favicons?domain=${window.location.hostname}`)
  .then((base64Img) => {
    extraction.favicon = base64Img;
  })
  .catch(() => null)
  .then(() => {
    console.log('dispatching');
    store.dispatch(Actions.setExtraction(extraction));
  })
;

