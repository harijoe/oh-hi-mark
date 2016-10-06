import * as types from '../constants/ActionTypes';

export function sayHello(message) {
  return { type: types.SAY_HELLO, message };
}
