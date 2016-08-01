// @flow
import type { Action } from '../actions/types';
import type { User } from './types';

const initialState = {
  signedIn: false,
  admin: false,
  uid: null,
  name: null,
  userName: null,
  status: null,
};

export const user = (state : User = initialState, action: Action): User => {
  switch (action.type) {
    case 'SIGNED_IN': {
      const { uid, name, userName, status } = action;
      return Object.assign({}, state, {
        signedIn: true,
        uid,
        name,
        userName,
        status,
      });
    }
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
