import DocumentStore from './index';

const store = new DocumentStore();

export const init = (documents) => {
  store.constructor(documents);
};

export default store;

// We can't just replace the store cause we need to keep the ref to it
export const setStore = newStore => (store.constructor(newStore.getDocuments()));
