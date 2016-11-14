import axios from './axios';
import { serializeStore, mergeStore, persistIndex } from './elasticlunr';

export const fetchStore = () => {
  return axios.get('index')
    .then((res) => {
      const uncompressed = res.data.payload;
      const store = JSON.parse(uncompressed);

      return store;
      // // FOR DEV
      // return {};
    })
    .catch(error => null)
  ;
};

export const pushStore = () => {
  const serializedStore = JSON.stringify(serializeStore());

  return axios.post('index', {
    payload: serializedStore
  }).then(res => res.status)
    .catch(error => null);
};

// TODO Handle error in a more secure way
export const syncStore = async function syncStore () {
  const remoteStore = await fetchStore();
  const usefulMerge = mergeStore(remoteStore);
  if (usefulMerge) {
    const status = await pushStore();
    if (status !== 201) {
      return false;
    }
    persistIndex();
  }

  return true;
}
