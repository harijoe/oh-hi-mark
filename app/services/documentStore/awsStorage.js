import axios from '../axios';
import DocumentStore from '../documentStore';
import { compress, decompress } from '../jsonCompressor';

/*
 Utility class to store/retrieve to/from the aws
 */

/*
 Pushes a documentStore to aws

 @param  DocumentStore
 @return Promise(boolean)
 */
export const push = documentStore => axios.post('index', {
  payload: compress({
    docs: documentStore.getDocuments(),
    version: 1,
  })
})
  .then(res => res.status)
  .catch(e => null) // Maybe handle error more nicely ?
;

/*
 Fetches a documentStore from aws
 @return Promise(DocumentStore)
 */
export const fetch = () => axios.get('index')
  .then(response => decompress(response.data.payload))
  .then(payload => (payload != null ? new DocumentStore(payload.docs) : new DocumentStore()))
  .catch(e => new DocumentStore())
;
