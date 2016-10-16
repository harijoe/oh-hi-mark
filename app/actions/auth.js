import * as types from '../constants/ActionTypes';

export function requestToken() {
  return { type: types.REQUEST_TOKEN };
}

export function setToken(token) {
  return { type: types.SET_TOKEN, token };
}
