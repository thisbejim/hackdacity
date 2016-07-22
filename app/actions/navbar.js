// @flow

// types
import { Action } from './types';

// Navbar
const navBarLoadingOn = (): Action => ({
  type: 'NAVBAR_LOADING_ON',
});

const navBarLoadingOff = (): Action => ({
  type: 'NAVBAR_LOADING_OFF',
});

const openSnackBar = (message: string): Action => ({
  type: 'OPEN_SNACK_BAR',
  message,
});

const clearSnackBar = (): Action => ({
  type: 'CLEAR_SNACK_BAR',
});

module.exports = {
  navBarLoadingOn, navBarLoadingOff, openSnackBar,
  clearSnackBar,
};
