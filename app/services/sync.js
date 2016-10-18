import axios from './axios';
import { serializeStore, mergeStore, persistIndex } from './elasticlunr';

export const fetchStore = () => {
  return axios.get('index')
    .then((res) => {
      const uncompressed = res.data.payload;
      const store = JSON.parse(uncompressed);

      return store;
    })
    .catch(error => null)
  ;
};

export const pushStore = () => {
  const serializedStore = JSON.stringify(serializeStore());

  return axios.post('index', {
    payload: serializedStore
  });
};

export const syncStore = async function syncStore () {
  const remoteStore = await fetchStore();

  const usefulMerge = mergeStore(remoteStore);
  console.log('usefulMerge', usefulMerge);
  if (usefulMerge) {
    await pushStore();
    persistIndex();
  }
}
