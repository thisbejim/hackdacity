// @flow

// firebase
import { auth, database, firebaseError } from './firebase';

// types
import type { Action, ThunkAction } from './types';

// actions
import { openSnackBar } from './navbar';
import { isAdmin } from './admin';

const signedIn = (uid: string, displayName: string): Action => ({
  type: 'SIGNED_IN',
  uid,
  displayName,
});

// Authentication handler
const checkAuth = (): ThunkAction => (dispatch): void => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      // User is signed in.
      dispatch(signedIn(user.uid, user.displayName));
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

const signIn = (email: string, password: string): ThunkAction => async(dispatch): Promise<void> => {
  try {
    dispatch(authDialogLoadingOn());
    await auth.signInWithEmailAndPassword(email, password);
    dispatch(toggleAuthDialogOpen());
  } catch (e) {
    dispatch(signInError(firebaseError(e)));
  }
};

// Sign up
const signUp = (
  name: string, email: string, password: string
): ThunkAction => async(dispatch): Promise<void> => {
  try {
    dispatch(authDialogLoadingOn());
    const user = await auth.createUserWithEmailAndPassword(email, password);
    await user.updateProfile({ displayName: name });
    const uid = user.uid;
    // add
    await database.ref('applied').child(uid).set({
      uid,
      name,
      email,
      date: new Date().getTime(),
    });
    dispatch(toggleAuthDialogOpen());
  } catch (e) {
    dispatch(signInError(firebaseError(e)));
  }
};


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
  signedIn, signIn, signUp,
  signedOut, signOut, updateDialogForm,
};
