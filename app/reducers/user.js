// @flow
import type { Action } from '../actions/types';
import type { User } from './types';

const initialState = {
  signedIn: false,
  admin: false,
  uid: null,
  name: null,
  userName: null,
};

export const user = (state : User = initialState, action: Action): User => {
  switch (action.type) {
    case 'SIGNED_IN':
      return Object.assign({}, state, {
        signedIn: true,
        uid: action.uid,
      });
    case 'ADD_USER_DETAILS':
      return Object.assign({}, state, {
        name: action.name,
        userName: action.userName,
      });
    case 'SIGNED_OUT':
      return Object.assign({}, state, initialState);
    case 'IS_ADMIN':
      return Object.assign({}, state, { admin: action.isAdmin });
    default:
      return state;
  }
};
