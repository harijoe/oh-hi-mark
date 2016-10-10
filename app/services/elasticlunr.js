import elasticlunr from 'elasticlunr';
import { INDEX_KEY } from '../constants/Storage';
import _ from 'lodash';
elasticlunr.clearStopWords();

let index;
const fields = ['title', 'authors', 'description', 'text', 'url', 'publisher'];
const getFields = ['title', 'url'];
const searchConfig = {
  bool: 'OR',
  expand: true,
  fields: {
    title: { boost: 10 },
    publisher: { boost: 10 },
    authors: { boost: 10 },
    description: { boost: 5 },
    text: { boost: 1 },
    url: { boost: 0 },
  }
};

// TODO Add versioning to fields
export const initIndex = () => {
  index = elasticlunr((config) => {
    fields.map(field => config.addField(field));
  });
};

export const loadIndex = (serializedIndex) => {
  console.log('serializedIndex', serializedIndex);
  console.log('index', index);
  if (serializedIndex !== null) {
    index = elasticlunr.Index.load(serializedIndex);
  }
  console.log('index', index);
};

export const serialize = () => index.toJSON();

export const addDoc = (doc) => {
  index.addDoc(doc);

  console.log(serialize());
};

export const persistIndex = () => {
  chrome.storage.local.set({ INDEX_KEY: serialize() });
};

// Check if rawResults is array
export const hydrate = (rawResults) => {
  console.log(rawResults);
  return rawResults.map(raw => Object.assign({},
    _.pick(index.documentStore.getDoc(raw.ref), getFields),
    { id: raw.ref },
  ));
};

export const search = query => index.search(query,
  searchConfig
);
