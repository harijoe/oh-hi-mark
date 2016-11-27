import Fuse from 'fuse.js';

const options = {
  shouldSort: true,
  threshold: 0.8,
  location: 0,
  distance: 1000,
  maxPatternLength: 32,
  tokenize: true,
  include: ['score'],
  keys: [{
    name: 'title',
    weight: 1,
  }, {
    name: 'description',
    weight: 0.8,
  }, {
    name: 'content',
    weight: 0.5,
  }, {
    name: 'url',
    weight: 1,
  }],
};

export default class Search
{
  constructor(documentStore = null) {
    this.init(documentStore);
  }

  init = (documentStore) => {
    this.fuse = new Fuse(Object.values(documentStore.getDocuments()), options);
  };

  search = query => {
    const results = this.fuse.search(query.trim());
    console.log(results);
    results.map(result => console.log(result.item.title, result.score));
    return results.map(result => result.item).reverse();
  }
}
