// react-router
import { browserHistory } from 'react-router'

// firebase
const config = {
  apiKey: "AIzaSyBweQbo_H6C-vgCXBTHmCzAhFrNQTzkOM8",
  authDomain: "hackdacity.firebaseapp.com",
  databaseURL: "https://hackdacity.firebaseio.com",
  storageBucket: "hackdacity.appspot.com",
};

firebase.initializeApp(config);
const auth = firebase.auth();

export const checkAuth = () => {
  return dispatch => {
    const user = auth.currentUser;
    console.log(user)
    if (user) {
      // User is signed in.
      console.log(user)
      dispatch(signedIn());
    }
  }
}

export const signedIn = () => {
  return {
    type: "SIGNED_IN"
  }
}

export const signedOut = () => {
  return {
    type: "SIGNED_OUT"
  }
}

export const toggleSignInDialogOpen = () => {
  return {
    type: "TOGGLE_SIGN_IN_DIALOG_OPEN"
  }
}

export const startSignIn = () => {
  return {
    type: "START_SIGN_IN"
  }
}

export const signInError = (error) => {
  return {
    type: "SIGN_IN_ERROR",
    error: error
  }
}

export const signIn = (email, password) => {
  console.log("sign in called", email, password)
  return async(dispatch) => {
    try {
      dispatch(startSignIn());
      await auth.signInWithEmailAndPassword(email, password);
      dispatch(signedIn());
      dispatch(toggleSignInDialogOpen());
    } catch(e) {
      dispatch(signInError(firebaseError(e)));
    }
  }
}

export const signOut = () => {
  return async(dispatch) => {
    try {
      await auth.signOut();
      dispatch(signedOut());
    } catch(e) {
      console.log(e)
    }
  }
}

const firebaseError = (error) => {
  switch(error.code) {
    case "auth/user-not-found":
      return "You did not enter a valid Hackdacity account"
  }
}
