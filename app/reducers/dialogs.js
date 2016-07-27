// @flow
import type { Action } from '../actions/types';
import type { Dialogs } from './types';


const initialState = {
  auth: {
    page: 'login',
    open: false,
    loading: false,
    error: null,
    name: '',
    userName: '',
    email: '',
    password: '',
  },
};

export const dialogs = (state : Dialogs = initialState, action: Action): Dialogs => {
  switch (action.type) {
    case 'TOGGLE_AUTH_DIALOG_OPEN': {
      const open = state.auth.open === false;
      const newState = Object.assign(state.auth, { open, loading: false, page: 'signIn' });
      return Object.assign({}, state, { auth: newState });
    }
    case 'TOGGLE_AUTH_PAGE': {
      const page = state.auth.page === 'signIn' ? 'signUp' : 'signIn';
      const newState = Object.assign(state.auth, { page });
      return Object.assign({}, state, { auth: newState });
    }
    case 'SIGN_IN_ERROR': {
      const newState = Object.assign(state.auth, { error: action.error, loading: false });
      return Object.assign({}, state, { auth: newState });
    }
    case 'AUTH_MODAL_LOADING_ON': {
      const newState = Object.assign(state.auth, { loading: true });
      return Object.assign({}, state, { auth: newState });
    }
    case 'AUTH_MODAL_LOADING_OFF': {
      const newState = Object.assign(state.auth, { loading: false });
      return Object.assign({}, state, { auth: newState });
    }
    case 'UPDATE_DIALOG_FORM': {
      const value = { [action.prop]: action.value };
      const form = Object.assign({}, state[action.form], value);
      return Object.assign({}, state, { [action.form]: form });
    }
    default:
      return state;
  }
};
