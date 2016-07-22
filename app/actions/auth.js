// @flow

// firebase
import { auth, database, firebaseError } from "./firebase";

// types
import { Action, ThunkAction } from "./types";

// actions
import { openSnackBar } from "./navbar";
import { isAdmin } from "./admin";

// Authentication handler
const checkAuth = (): ThunkAction => {
  return (dispatch): void => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        dispatch(signedIn(user.uid, user.displayName));
        dispatch(openSnackBar("Signed In"))
        dispatch(isAdmin(user.uid));
      }
    });
  }
}


// Auth modal
const toggleAuthDialogOpen = (): Action => {
  return {
    type: "TOGGLE_AUTH_DIALOG_OPEN"
  }
}

const authDialogLoadingOn = (): Action => {
  return {
    type: "AUTH_MODAL_LOADING_ON"
  }
}

const authDialogLoadingOff = (): Action => {
  return {
    type: "AUTH_MODAL_LOADING_OFF"
  }
}

// Sign in
const toggleAuthPage = (): Action => {
  return {
    type: "TOGGLE_AUTH_PAGE"
  }
}

const signInError = (error: string): Action => {
  return {
    type: "SIGN_IN_ERROR",
    error: error
  }
}

const signedIn = (uid: string, displayName: string): Action => {
  return {
    type: "SIGNED_IN",
    uid: uid,
    displayName: displayName
  }
}

const signIn = (email: string, password: string): ThunkAction => {
  return async(dispatch): Promise<void> => {
    try {
      dispatch(authDialogLoadingOn());
      await auth.signInWithEmailAndPassword(email, password);
      dispatch(toggleAuthDialogOpen());
    } catch(e) {
      dispatch(signInError(firebaseError(e)));
    }
  }
}

// Sign up
const signUp = (name: string, email: string, password: string): ThunkAction => {
  return async(dispatch): Promise<void> => {
    try {
      dispatch(authDialogLoadingOn());
      const user = await auth.createUserWithEmailAndPassword(email, password);
      await user.updateProfile({displayName: name});
      const uid = user.uid;
      // add
      await database.ref("applied").child(uid).set({
        id: uid,
        name: name,
        email: email,
        date: new Date().getTime()
      });
      dispatch(toggleAuthDialogOpen());
    } catch(e) {
      dispatch(signInError(firebaseError(e)));
    }
  }
}

// Sign out
const signedOut = (): Action => {
  return {
    type: "SIGNED_OUT"
  }
}

const signOut = (): ThunkAction => {
  return async(dispatch): Promise<void> => {
    try {
      await auth.signOut();
      dispatch(signedOut());
    } catch(e) {
      console.log(e)
    }
  }
}

module.exports = {
  checkAuth, toggleAuthDialogOpen, authDialogLoadingOn,
  authDialogLoadingOff, toggleAuthPage, signInError,
  signedIn, signIn, signUp,
  signedOut, signOut
};
