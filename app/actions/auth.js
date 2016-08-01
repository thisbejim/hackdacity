// @flow

// firebase
import { auth, database } from './firebase';

// types
import type { Action, ThunkAction } from './types';

// actions
import { openSnackBar } from './navbar';
import { isAdmin } from './admin';

const signedIn = (uid: string, name: string, userName: string, status: string): Action => ({
  type: 'SIGNED_IN',
  uid,
  name,
  userName,
  status,
});

// Authentication handler
const checkAuth = (): ThunkAction => (dispatch): void => {
  auth.onAuthStateChanged(async(user) => {
    if (user) {
      // User is signed in.
      const d = await database.ref('users').child(user.uid).once('value');
      const details = d.val();
      dispatch(signedIn(user.uid, details.name, details.userName, details.status));
      dispatch(openSnackBar('Signed In'));
      dispatch(isAdmin(user.uid));
    }
  });
};

// Auth modal
const toggleAuthDialogOpen = (): Action => ({
  type: 'TOGGLE_AUTH_DIALOG_OPEN',
});

const authDialogLoadingOn = (): Action => ({
  type: 'AUTH_MODAL_LOADING_ON',
});

const authDialogLoadingOff = (): Action => ({
  type: 'AUTH_MODAL_LOADING_OFF',
});

const updateDialogForm = (form: string, prop: string, value: string): Action => ({
  type: 'UPDATE_DIALOG_FORM',
  form,
  prop,
  value,
});

// Sign in
const toggleAuthPage = (): Action => ({
  type: 'TOGGLE_AUTH_PAGE',
});

const signInError = (error: string): Action => ({
  type: 'SIGN_IN_ERROR',
  error,
});

// Sign out
const signedOut = (): Action => ({
  type: 'SIGNED_OUT',
});

const signOut = (): ThunkAction => async(dispatch): Promise<void> => {
  await auth.signOut();
  dispatch(signedOut());
};

module.exports = {
  checkAuth, toggleAuthDialogOpen, authDialogLoadingOn,
  authDialogLoadingOff, toggleAuthPage, signInError,
  signedIn, signedOut, signOut, updateDialogForm,
};
