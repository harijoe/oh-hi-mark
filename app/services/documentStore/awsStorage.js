import axios from '../axios';
import DocumentStore from '../documentStore';

/*
 Utility class to store/retrieve to/from the aws
 */

/*
 Pushes a documentStore to aws

 @param  DocumentStore
 @return Promise(boolean)
 */
export const push = documentStore => axios.post('index', {
  payload: JSON.stringify(documentStore.getDocuments())
})
  .then(res => res.status)
  .catch(() => null) // Maybe handle error more nicely ?
;

/*
 Fetches a documentStore from aws
 @return Promise(DocumentStore)
 */
export const fetch = () => axios.get('index')
  .then(response => JSON.parse(response.data.payload))
  .then(documents => new DocumentStore(documents))
;
