import * as types from '../constants/ActionTypes';

export function setOs(os) {
  return { type: types.SET_OS, os };
}
