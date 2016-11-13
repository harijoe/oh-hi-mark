import elasticlunr from 'elasticlunr';
import _ from 'lodash';
import { INDEX_KEY } from '../constants/Storage';
import { hashCode, cleanUrl } from '../services/util';

// TODO Add versioning to fields
// TODO Add doc to each function
// TODO Add tests

let index;
const fields = ['title', 'authors', 'description', 'text', 'url', 'publisher', 'date', 'favicon'];
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
  index = createIndex();
};

export const createIndex = () => elasticlunr((config) => {
  fields.map(field => config.addField(field));
});

export const loadIndex = (serializedIndex) => {
  if (serializedIndex != null) {
    index = elasticlunr.Index.load(serializedIndex);
  }
};

export const serialize = () => index.toJSON();

export const serializeStore = () => index.documentStore.toJSON();

/*
  @return boolean the fact that the merge was useful
 */
export const mergeStore = (remoteStore) => {
  const localStore = serializeStore();
  if (_.isEqual(localStore, remoteStore)) {
    return false;
  }
  const target = {};
  _.merge(target, localStore, remoteStore);
  target.length = Object.keys(target.docs).length;

  if (target.docs != null) {
    createIndex();
    _.each(target.docs, doc => index.addDoc(doc));
  }

  return true;
};

export const loadStore = (serializedStore) => {
  index.documentStore = elasticlunr.DocumentStore.load(serializedStore);
};

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

export const hydrate = rawResults => rawResults.map(raw => Object.assign({},
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

export const getLatestResults = () => {
  return _.sortBy(index.documentStore.docs, 'date')
    .slice(-MAX_RESULTS)
    .reverse();
};
