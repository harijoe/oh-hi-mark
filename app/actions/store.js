import * as types from '../constants/ActionTypes';

export function setSynced(synced) {
  return { type: types.SET_SYNCED, synced };
}

export function setStoreInfo(info) {
  return { type: types.SET_STORE_INFO, info };
}
