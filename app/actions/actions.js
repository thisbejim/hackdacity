// fetch
import 'whatwg-fetch';
// react-router
import { browserHistory } from 'react-router'

// Firebase
const config = {
  apiKey: "AIzaSyBweQbo_H6C-vgCXBTHmCzAhFrNQTzkOM8",
  authDomain: "hackdacity.firebaseapp.com",
  databaseURL: "https://hackdacity.firebaseio.com",
  storageBucket: "hackdacity.appspot.com",
};

firebase.initializeApp(config);
const auth = firebase.auth();
const database = firebase.database();

const firebaseError = (error) => {
  switch(error.code) {
    case "auth/user-not-found":
      return "You did not enter a valid Hackdacity account"
  }
}

// Authentication
export const checkAuth = () => {
  return dispatch => {
    dispatch(navBarLoadingOn());
    auth.onAuthStateChanged((user) => {
      dispatch(navBarLoadingOff());
      if (user) {
        // User is signed in.
        console.log(user)
        dispatch(signedIn());
      }
    });
  }
}


// Sign in
export const signedIn = () => {
  return {
    type: "SIGNED_IN"
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

// Sign out
export const signedOut = () => {
  return {
    type: "SIGNED_OUT"
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


// Admin

export const invalidApplicant = (user_id) => {
  return async(dispatch) => {
    await database.ref("applied").child(user_id).remove();
  }
}

export const validApplicant = (user_id, email, token) => {
  return async(dispatch) => {
    try {
      await database.ref("alumni").child(user_id).set(true);
      await database.ref("applied").child(user_id).remove();
      await addUserToSlack(email, token);
    } catch(e) {
      console.log(e)
    }
  }
}

const addApplicants = (applicants) => {
  return {
    type: "ADD_APPLICANTS",
    applicants: applicants
  }
}

export const getApplicants = () => {
  return dispatch => {
    dispatch(navBarLoadingOn());
    database.ref("applied").on('value', (snapshot) => {
      const applicants = [];
      snapshot.forEach((data) => {
        applicants.push(data.val());
      });
      dispatch(navBarLoadingOff());
      dispatch(addApplicants(applicants));
    });
  }
}

export const detachApplicantListener = () => {
  return dispatch => {
    database.ref("applied").off('value');
  }
}


// slack
const addUserToSlack = async(email, token) => {
  const formData = new FormData();
  formData.append('email', email);
  formData.append('token', token);
  const response = await fetch('https://slack.com/api/users.admin.invite', {
    method: 'POST',
    body: formData
  });
}

const updateSlackCredentials = (token) => {
  return {
    type: "UPDATE_SLACK_CREDENTIALS",
    token: token
  }
}

export const getSlackCredentials = () => {
  return async(dispatch) => {
    const slack = await database.ref("slack").once('value');
    dispatch(updateSlackCredentials(slack.val().token));
  }
}

// navbar
const navBarLoadingOn = () => {
  return {
    type: "NAVBAR_LOADING_ON"
  }
}

const navBarLoadingOff = () => {
  return {
    type: "NAVBAR_LOADING_OFF"
  }
}
