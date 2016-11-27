import _ from 'lodash';
import { idFromUrl } from '../../services/util';

export default class DocumentStore
{
  /*
      DocumentStore constructor
      @param (optional) documents to initialize the store
   */
  constructor(documents = {}) {
    this.documents = documents;
    this.removedDocs = new Set();
    this.updateListeners = [];
    this.onUpdate();
  }

  getDocuments = () => this.documents;

  addDoc = (doc) => {
    if (doc.url == null) {
      throw new Error('a doc should define a url');
    }

    const id = idFromUrl(doc.url);
    const docWithId = Object.assign({}, doc, { id });
    this.documents[id] = docWithId;
    this.onUpdate();
  };

  removeDoc = (url) => {
    const id = idFromUrl(url);
    delete this.documents[id];
    this.removedDocs.add(id);
    this.onUpdate();
  };

  hasDoc = url => this.documents[idFromUrl(url)] != null;

  /*
      Returns true if store and inner store are equal
      @params DocumentStore
      @return boolean
   */
  equals = (documentStore) => {
    if (documentStore == null) {
      return false;
    }
    return _.isEqual(this.documents, documentStore.documents);
  }

  /*
      Merges param store with inner store
      Returns the fact that the merge was useful
      @param DocumentStore
      @return boolean
   */
  merge = (documentStore) => {
    // TODO Check if param is a documentStore ?
    if (this.equals(documentStore)) {
      return false;
    }

    const mergedDocuments = {};
    _.merge(mergedDocuments, this.documents, documentStore.documents);

    this.documents = mergedDocuments;

    // Make sure removed docs on client side are eventually removed
    this.removedDocs.forEach(id => this.removeDoc(id));
    this.removedDocs.clear();
    this.onUpdate();

    return true;
  };

  count = () => Object.keys(this.documents).length;

  onUpdate = () => this.updateListeners.map(listener => listener());

  addListener = listener => this.updateListeners.push(listener);
}
