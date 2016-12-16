import DocumentStore from './index';
import Search from './search';

const store = new DocumentStore();
export default store;
export const searchEngine = new Search();

export const init = (documents) => {
  store.constructor(documents);
};

// We can't just replace the store cause we need to keep the ref to it
export const setStore = newStore => {
  store.constructor(newStore.getDocuments());
  searchEngine.constructor(store);
};
