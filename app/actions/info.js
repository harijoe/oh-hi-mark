import * as types from '../constants/ActionTypes';

export function setOs(os) {
  return { type: types.SET_OS, os };
}

export function setId(id) {
  return { type: types.SET_ID, id };
}

export function setEmail(email) {
  return { type: types.SET_EMAIL, email };
}