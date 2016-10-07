import * as types from '../constants/ActionTypes';

export function sayHello(message) {
  return { type: types.SAY_HELLO, message };
}

export function setContent(content) {
  return { type: types.SET_CONTENT, content };
}

export function savePage() {
  return { type: types.SAVE_PAGE };
}
