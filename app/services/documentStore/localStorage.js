import chrome from '../chrome';
import { INDEX_KEY } from '../../constants/Storage';
import DocumentStore from './index';

/*
  Utility class to store/retrieve to/from the chrome local storage
 */

/*
 Pushes a documentStore to chrome local storage

 @param  DocumentStore
 @return Promise(boolean)
 */
export const push = documentStore =>
  chrome.storage.local.set({ [INDEX_KEY]: documentStore.getDocuments() })
;

/*
 Fetches a documentStore from chrome local storage
 @return Promise(DocumentStore)
 */
export const fetch = () =>
   chrome.storage.local.get(INDEX_KEY)
    .then(data => new DocumentStore(data[INDEX_KEY]))
;
