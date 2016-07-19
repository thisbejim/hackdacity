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

// approve
export const invalidApplicant = (user_id) => {
  return async(dispatch) => {
    await database.ref("applied").child(user_id).remove();
  }
}

export const validApplicant = (user_id, email, token) => {
  return async(dispatch) => {
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
      const applicants = Object.values(snapshot.val());
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

// Dashboard
const addhackathons = (currentHackathon, hackathons, categories, prizes) => {
  return {
    type: "ADD_HACKATHONS",
    currentHackathon: currentHackathon,
    hackathons: hackathons,
    categories: categories,
    prizes: prizes
  }
}

export const getHackathons = () => {
  return async(dispatch) => {
    dispatch(navBarLoadingOn());
    // fetch in parallel
    const results = await Promise.all([
      database.ref("currentHackathon").once('value'),
      database.ref("hackathons").once('value'),
      database.ref("categories").once('value'),
      database.ref("prizes").once('value')
    ]);
    // TODO test speed of parallel
    // console.log(result)
    // const currentHackathon = await database.ref("currentHackathon").once('value');
    // console.log("1 fired")
    // const hackathons = await database.ref("hackathons").once('value');
    // console.log("2 fired")
    // const categories = await database.ref("categories").once('value');
    // console.log("3 fired")
    // const prizes = await database.ref("prizes").once('value');
    // console.log("4 fired")

    dispatch(
      addhackathons(
        results[0].val(),
        Object.values(results[1].val()),
        Object.values(results[2].val()),
        Object.values(results[3].val())
      )
    );
    dispatch(navBarLoadingOff());
  }
}

export const toggleEditHackathon = () => {
  return {
    type: "TOGGLE_EDIT_HACKATHON"
  }
}

export const deletePrize = (id) => {
  return {
    type: "DELETE_PRIZE",
    id: id
  }
}

export const addPrize = (categoryId) => {
  return {
    type: "ADD_PRIZE",
    categoryId: categoryId,
    id: database.ref().push().key
  }
}

export const updatePrize = (id, text) => {
  return {
    type: "UPDATE_PRIZE",
    id: id,
    text: text
  }
}

export const updateCategory = (id, name) => {
  return {
    type: "UPDATE_CATEGORY",
    id: id,
    name: name
  }
}

export const addPrizeCategory = (hackId) => {
  return {
    type: "ADD_PRIZE_CATEGORY",
    hackId: hackId,
    id: database.ref().push().key
  }
}

export const deleteCategory = (categoryId) => {
  return {
    type: "DELETE_CATEGORY",
    categoryId: categoryId
  }
}

export const updateDate = (id, date, dateType) => {
  return {
    type: "UPDATE_DATE",
    id: id,
    date: date.getTime(),
    dateType: dateType
  }
}
export const saveHackathon = (state) => {
  return async(dispatch) => {
    // prizes
    const prizes = state.prizes.reduce((previous, current) => {
      previous[current.id] = current
      return previous
    }, {});

    // prize categories
    const categories = state.categories.reduce((previous, current) => {
      previous[current.id] = current
      return previous
    }, {});

    // prize hackathons
    const hackathons = state.hackathons.reduce((previous, current) => {
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
