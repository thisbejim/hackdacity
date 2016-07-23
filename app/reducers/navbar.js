// @flow
import type { Action } from '../actions/types';
import type { Navbar } from './types';

const initialState = {
  loading: false,
  snackbar: {
    open: false,
    message: '',
  },
};

export const navbar = (state : Navbar = initialState, action: Action): Navbar => {
  switch (action.type) {
    case 'NAVBAR_LOADING_ON':
      return Object.assign({}, state, { loading: true });
    case 'NAVBAR_LOADING_OFF':
      return Object.assign({}, state, { loading: false });
    case 'OPEN_SNACK_BAR': {
      const snack = state.snackbar;
      const newSnackState = Object.assign({}, snack, { open: true, message: action.message });
      return Object.assign({}, state, { snackbar: newSnackState });
    }
    case 'CLEAR_SNACK_BAR': {
      const snack = state.snackbar;
      const newSnackState = Object.assign({}, snack, { open: false, message: '' });
      return Object.assign({}, state, { snackbar: newSnackState });
    }
    default:
      return state;
  }
};
