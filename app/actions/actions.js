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
      return "You did not enter a valid Hackdacity account."
  }
}

// Navbar
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

// Authentication handler
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

export const signedIn = () => {
  return {
    type: "SIGNED_IN"
  }
}

// auth modal
export const toggleAuthDialogOpen = () => {
  return {
    type: "TOGGLE_AUTH_DIALOG_OPEN"
  }
}

const authDialogLoadingOn = () => {
  return {
    type: "AUTH_MODAL_LOADING_ON"
  }
}

const authDialogLoadingOff = () => {
  return {
    type: "AUTH_MODAL_LOADING_OFF"
  }
}

// Sign in
export const toggleAuthPage = () => {
  return {
    type: "TOGGLE_AUTH_PAGE"
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
      dispatch(authDialogLoadingOn());
      await auth.signInWithEmailAndPassword(email, password);
      dispatch(toggleAuthDialogOpen());
    } catch(e) {
      dispatch(signInError(firebaseError(e)));
    }
  }
}

// sign up

export const signUp = (name, email, password) => {
  console.log("sign up called", name, email, password)
  return async(dispatch) => {
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
const signedOut = () => {
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
    database.ref("applied").orderByChild("date").on('value', (snapshot) => {
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


// Slack
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


// submissions
export const changeTab = (tab) => {
  return {
    type: "CHANGE_TAB",
    tab: tab
  }
}
