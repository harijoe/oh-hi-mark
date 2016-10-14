import elasticlunr from 'elasticlunr';
import { INDEX_KEY } from '../constants/Storage';
import { hashCode, cleanUrl } from '../services/util';
import _ from 'lodash';

// TODO Add versioning to fields

let index;
const fields = ['title', 'authors', 'description', 'text', 'url', 'publisher', 'date'];
const getFields = ['title', 'url', 'favicon', 'date'];
const searchConfig = {
  bool: 'AND',
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
const MAX_RESULTS = 6;

export const initIndex = () => {
  if (index !== undefined) {
    return;
  }
  elasticlunr.clearStopWords();
  index = elasticlunr((config) => {
    fields.map(field => config.addField(field));
  });
};

export const loadIndex = (serializedIndex) => {
  if (serializedIndex !== null) {
    index = elasticlunr.Index.load(serializedIndex);
  }
};

export const serialize = () => index.toJSON();

export const addDoc = (doc) => {
  const identifiedDoc = Object.assign({}, doc, {
    id: hashCode(cleanUrl(doc.url)),
  });
  index.addDoc(identifiedDoc);
};

export const hasDoc = (url) => {
  const id = hashCode(cleanUrl(url));
  return index.documentStore.hasDoc(id);
};

export const persistIndex = () => {
  chrome.storage.local.set({ [INDEX_KEY]: serialize() });
};

export const hydrate = (rawResults) => rawResults.map(raw => Object.assign({},
  _.pick(index.documentStore.getDoc(raw.ref), getFields),
  { id: raw.ref },
));

export const search = query => index.search(query,
  searchConfig
).slice(0, MAX_RESULTS);

// Add store info here like version etc
export const info = () => ({
  length: index.documentStore.length,
});
