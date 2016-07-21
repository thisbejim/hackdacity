// @flow

// fetch
import 'whatwg-fetch';
// react-router
import { browserHistory } from 'react-router'
// types
import {
  Action, Hackathon, Hackathons,
  Prizes, Categories, Applicants,
  ThunkAction
} from "./types";

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

const firebaseError = (error: {code: string, message: string}): string => {
  switch(error.code) {
    case "auth/user-not-found":
      return "You did not enter a valid Hackdacity account."
    default:
      return "Unknown error occurred."
  }
}

// Start up
export const startUp = (): ThunkAction => {
  return async(dispatch): Promise<void> => {
    console.log(dispatch)
    dispatch(navBarLoadingOn());
    await Promise.all([
      dispatch(getHackathon()),
      dispatch(checkAuth())
    ]);
    dispatch(navBarLoadingOff());
  }
}

// Authentication handler
export const checkAuth = (): ThunkAction => {
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


const isAdmin = (uid: string): ThunkAction => {
  return async(dispatch): Promise<void> => {
    const admin = await database.ref("admins").child(uid).once("value");
    dispatch(updateAdmin(admin.val()));
  }
}

const updateAdmin = (isAdmin: boolean): Action => {
  return {
    type: "IS_ADMIN",
    isAdmin: isAdmin
  }
}

const updateCurrentHackathon = (hackathon: Hackathon): Action => {
  return {
    type: "UPDATE_CURRENT_HACKATHON",
    hackathon: hackathon
  }
}

export const getHackathon = (): ThunkAction => {
  return async(dispatch): Promise<void> => {
    const hackathonId = await database.ref("currentHackathon").once("value");
    const hackathon = await database.ref("hackathons").child(hackathonId.val()).once("value");
    dispatch(updateCurrentHackathon(hackathon.val()))
  }
}

// Navbar
const navBarLoadingOn = (): Action => {
  return {
    type: "NAVBAR_LOADING_ON"
  }
}

const navBarLoadingOff = (): Action => {
  return {
    type: "NAVBAR_LOADING_OFF"
  }
}

export const openSnackBar = (message: string): Action => {
  return {
    type: "OPEN_SNACK_BAR",
    message: message
  }
}

export const clearSnackBar = (): Action => {
  return {
    type: "CLEAR_SNACK_BAR"
  }
}

// auth modal
export const toggleAuthDialogOpen = (): Action => {
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
export const toggleAuthPage = (): Action => {
  return {
    type: "TOGGLE_AUTH_PAGE"
  }
}

export const signInError = (error: string): Action => {
  return {
    type: "SIGN_IN_ERROR",
    error: error
  }
}

export const signedIn = (uid: string, displayName: string): Action => {
  return {
    type: "SIGNED_IN",
    uid: uid,
    displayName: displayName
  }
}

export const signIn = (email: string, password: string): ThunkAction => {
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

// sign up
export const signUp = (name: string, email: string, password: string): ThunkAction => {
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

export const signOut = (): ThunkAction => {
  return async(dispatch): Promise<void> => {
    try {
      await auth.signOut();
      dispatch(signedOut());
    } catch(e) {
      console.log(e)
    }
  }
}


// Admin

// approve
export const invalidApplicant = (user_id: string): ThunkAction => {
  return async(dispatch): Promise<void> => {
    await database.ref("applied").child(user_id).remove();
  }
}

export const validApplicant = (user_id: string, email: string, token: string): ThunkAction => {
  return async(dispatch): Promise<void> => {
    try {
      await Promise.all([
        database.ref("alumni").child(user_id).set(true),
        database.ref("applied").child(user_id).remove(),
        addUserToSlack(email, token)
      ]);
    } catch(e) {
      console.log(e)
    }
  }
}

const addApplicants = (applicants: Applicants): Action => {
  return {
    type: "ADD_APPLICANTS",
    applicants: applicants
  }
}

export const getApplicants = (): ThunkAction => {
  return (dispatch): void => {
    dispatch(navBarLoadingOn());
    database.ref("applied").orderByChild("date").on('value', (snapshot) => {
      const applicants = Object.values(snapshot.val());
      dispatch(navBarLoadingOff());
      dispatch(addApplicants(applicants));
    });
  }
}

export const detachApplicantListener = (): ThunkAction => {
  return (dispatch): void => {
    database.ref("applied").off('value');
  }
}

// Dashboard
const addhackathons = (currentHackathon: string, hackathons: Hackathons, categories: Categories, prizes: Prizes): Action => {
  return {
    type: "ADD_HACKATHONS",
    currentHackathon: currentHackathon,
    hackathons: hackathons,
    categories: categories,
    prizes: prizes
  }
}

/**
 * Convert prizes, prize categories, and hackathons to arrays for easy
 * manipulation in the reducer.
 */
export const getHackathons = (): ThunkAction => {
  return async(dispatch): Promise<void> => {
    dispatch(navBarLoadingOn());
    // fetch in parallel
    const [current, hackathons, categories, prizes] = await Promise.all([
      database.ref("currentHackathon").once('value'),
      database.ref("hackathons").once('value'),
      database.ref("categories").once('value'),
      database.ref("prizes").once('value')
    ]);
    // If val() is null pass empty obj to .values()
    dispatch(
      addhackathons(
        current.val(),
        Object.values(hackathons.val() || {}),
        Object.values(categories.val() || {}),
        Object.values(prizes.val() || {})
      )
    );
    dispatch(navBarLoadingOff());
  }
}

export const toggleEditHackathon = (): Action => {
  return {
    type: "TOGGLE_EDIT_HACKATHON"
  }
}

export const deletePrize = (id: string): Action => {
  return {
    type: "DELETE_PRIZE",
    id: id
  }
}

export const addPrize = (categoryId: string): Action => {
  return {
    type: "ADD_PRIZE",
    categoryId: categoryId,
    id: database.ref().push().key
  }
}

export const updatePrize = (id: string, text: string): Action => {
  return {
    type: "UPDATE_PRIZE",
    id: id,
    text: text
  }
}

export const updateCategory = (id: string, name: string): Action => {
  return {
    type: "UPDATE_CATEGORY",
    id: id,
    name: name
  }
}

export const addPrizeCategory = (hackId: string): Action => {
  return {
    type: "ADD_PRIZE_CATEGORY",
    hackId: hackId,
    id: database.ref().push().key
  }
}

export const deleteCategory = (categoryId: string): Action => {
  return {
    type: "DELETE_CATEGORY",
    categoryId: categoryId
  }
}

export const updateDate = (id: string, date: Date, dateType: string): Action => {
  return {
    type: "UPDATE_DATE",
    id: id,
    date: date.getTime(),
    dateType: dateType
  }
}

/**
 * Reduce prizes, prize categories, and hackathons to objects
 * to save back into Firebase.
 */
export const saveHackathon = (p: Prizes, c: Categories, h: Hackathons): ThunkAction => {
  return async(dispatch): Promise<void> => {
    // prizes
    const prizes = p.reduce((previous, current) => {
      previous[current.id] = current
      return previous
    }, {});

    // prize categories
    const categories = c.reduce((previous, current) => {
      previous[current.id] = current
      return previous
    }, {});

    // prize hackathons
    const hackathons = h.reduce((previous, current) => {
      previous[current.id] = current
      return previous
    }, {});

    // update firebase
    await Promise.all([
      database.ref("hackathons").set(hackathons),
      database.ref("prizes").set(prizes),
      database.ref("categories").set(categories)
    ]);
    dispatch(toggleEditHackathon())
  }
}

// Slack
const addUserToSlack = async(email: string, token: string): Promise<void> => {
  const formData = new FormData();
  formData.append('email', email);
  formData.append('token', token);
  const response = await fetch('https://slack.com/api/users.admin.invite', {
    method: 'POST',
    body: formData
  });
}

const updateSlackCredentials = (token: string): Action => {
  return {
    type: "UPDATE_SLACK_CREDENTIALS",
    token: token
  }
}

export const getSlackCredentials = (): ThunkAction => {
  return async(dispatch): Promise<void> => {
    const slack = await database.ref("slack").once('value');
    dispatch(updateSlackCredentials(slack.val().token));
  }
}


// submissions
export const changeTab = (tab: string): Action => {
  return {
    type: "CHANGE_TAB",
    tab: tab
  }
}
