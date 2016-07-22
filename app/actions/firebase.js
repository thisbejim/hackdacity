// Firebase
const config = {
  apiKey: 'AIzaSyBweQbo_H6C-vgCXBTHmCzAhFrNQTzkOM8',
  authDomain: 'hackdacity.firebaseapp.com',
  databaseURL: 'https://hackdacity.firebaseio.com',
  storageBucket: 'hackdacity.appspot.com',
};

firebase.initializeApp(config);
const auth = firebase.auth();
const database = firebase.database();

const firebaseError = (error: {code: string, message: string}): string => {
  switch (error.code) {
    case 'auth/user-not-found':
      return 'You did not enter a valid Hackdacity account.';
    default:
      return 'Unknown error occurred.';
  }
};

module.exports = { auth, database, firebaseError };
