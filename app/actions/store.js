import { EventTypes } from 'redux-segment';
import * as types from '../constants/ActionTypes';

export function setSynced(synced) {
  return {
    type: types.SET_SYNCED,
    synced,
    meta: {
      analytics: {
        eventType: EventTypes.track,
        eventPayload: {
          event: synced ? 'Synced' : 'Not synced',
        }
      },
    },
  };
}

export function setStoreInfo(info) {
  return { type: types.SET_STORE_INFO, info };
}
