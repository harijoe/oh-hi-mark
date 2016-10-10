import elasticlunr from 'elasticlunr';
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

export const initIndex = (serializedIndex = null) => {
  if (serializedIndex !== null) {
    index = elasticlunr.load(serializedIndex);
    return;
  }

  index = elasticlunr((config) => {
    console.log('lunr', config);
    fields.map(field => config.addField(field));
  });
};

export const serialize = () => index.toJSON();

export const addDoc = (doc) => {
  index.addDoc(doc);

  console.log(serialize());
};

// Check if rawResults is array
export const hydrate = (rawResults) => {
  console.log(rawResults);
  return rawResults.map(raw => _.pick(index.documentStore.getDoc(raw.ref), getFields));
};

export const search = query => index.search(query,
  searchConfig
);
