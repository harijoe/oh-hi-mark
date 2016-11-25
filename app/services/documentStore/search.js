import Fuse from 'fuse.js';

const options = {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  keys: [{
    name: 'title',
    weight: 1,
  }, {
    name: 'authors',
    weight: 1,
  }, {
    name: 'description',
    weight: 0.8,
  }, {
    name: 'text',
    weight: 0.2,
  }, {
    name: 'url',
    weight: 1,
  }, {
    name: 'publisher',
    weight: 1,
  }]
};

export default class Search
{
  constructor(documentStore = null) {
    this.init(documentStore);
  }

  init = (documentStore) => {
    this.fuse = new Fuse(Object.values(documentStore.getDocuments()), options);
  };

  search = query => this.fuse.search(query.trim());
}
