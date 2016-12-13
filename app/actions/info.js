import { EventTypes } from 'redux-segment';
import * as types from '../constants/ActionTypes';

export function setOs(os) {
  return { type: types.SET_OS, os };
}

export function setId(id) {
  return {
    type: types.SET_ID,
    id,
    meta: {
      analytics: {
        eventType: EventTypes.identify,
        eventPayload: {
          userId: id,
        }
      },
    },
  };
}

export function setEmail(email) {
  return {
    type: types.SET_EMAIL,
    email,
    meta: {
      analytics: {
        eventType: EventTypes.identify,
        eventPayload: {
          traits: {
            email,
          }
        }
      },
    },
  };
}

export function requestToken() {
  return { type: types.REQUEST_TOKEN };
}

export function setToken(token) {
  return { type: types.SET_TOKEN, token };
}
