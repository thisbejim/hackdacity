// @flow

// firebase
import {
  database,
} from './firebase';

// actions
import {
  navBarLoadingOn, navBarLoadingOff,
} from './navbar';

// types
import type {
  Action, Prizes, Categories,
  Applicants, ThunkAction, Hackathons,
} from './types';

const updateAdmin = (isAdmin: boolean): Action => ({
  type: 'IS_ADMIN',
  isAdmin,
});

// Slack
const addUserToSlack = async(email: string, token: string): Promise<void> => {
  const formData = new FormData();
  formData.append('email', email);
  formData.append('token', token);
  await fetch('https://slack.com/api/users.admin.invite', {
    method: 'POST',
    body: formData,
  });
};

const updateSlackCredentials = (token: string): Action => ({
  type: 'UPDATE_SLACK_CREDENTIALS',
  token,
});

const getSlackCredentials = (): ThunkAction => async(dispatch): Promise<void> => {
  const slack = await database.ref('slack').once('value');
  dispatch(updateSlackCredentials(slack.val().token));
};

// Admin permission checks
const isAdmin = (uid: string): ThunkAction => async(dispatch): Promise<void> => {
  const admin = await database.ref('admins').child(uid).once('value');
  dispatch(updateAdmin(admin.val()));
};

// Approval Page
const invalidApplicant = (userId: string): ThunkAction => async(): Promise<void> => {
  await database.ref('applied').child(userId).remove();
};

const validApplicant = (
  userId: string, name: string, email: string, token: string
): ThunkAction => async(): Promise<void> => {
  try {
    await Promise.all([
      database.ref('alumni').child(userId).set(true),
      database.ref('applied').child(userId).remove(),
      database.ref('users').child(userId).set({ name }),
      addUserToSlack(email, token),
    ]);
  } catch (e) {
    console.log(e);
  }
};

const addApplicants = (applicants: Applicants): Action => ({
  type: 'ADD_APPLICANTS',
  applicants,
});

const getApplicants = (): ThunkAction => (dispatch): void => {
  dispatch(navBarLoadingOn());
  database.ref('applied').orderByChild('date').on('value', (snapshot) => {
    const applicants = Object.values(snapshot.val());
    dispatch(navBarLoadingOff());
    dispatch(addApplicants(applicants));
  });
};

const detachApplicantListener = (): ThunkAction => (): void => {
  database.ref('applied').off('value');
};


// Dashboard Page
const addHackathons = (
  currentHackathon: string, hackathons: Hackathons, categories: Categories, prizes: Prizes
): Action => ({
  type: 'ADD_HACKATHONS',
  currentHackathon,
  hackathons,
  categories,
  prizes,
});

/**
 * Convert prizes, prize categories, and hackathons fetched from firebase
 * to arrays for easy manipulation in the reducer.
 */
const getHackathons = (): ThunkAction => async(dispatch): Promise<void> => {
  dispatch(navBarLoadingOn());
  // fetch in parallel
  const [current, hackathons, categories, prizes] = await Promise.all([
    database.ref('currentHackathon').once('value'),
    database.ref('hackathons').once('value'),
    database.ref('categories').once('value'),
    database.ref('prizes').once('value'),
  ]);
  // If val() is null pass empty obj to .values()
  dispatch(
    addHackathons(
      current.val(),
      Object.values(hackathons.val() || {}),
      Object.values(categories.val() || {}),
      Object.values(prizes.val() || {})
    )
  );
  dispatch(navBarLoadingOff());
};

const toggleEditHackathon = (): Action => ({
  type: 'TOGGLE_EDIT_HACKATHON',
});

const deletePrize = (id: string): Action => ({
  type: 'DELETE_PRIZE',
  id,
});

const addPrize = (categoryId: string, hackathonId: string): Action => ({
  type: 'ADD_PRIZE',
  categoryId,
  hackathonId,
  id: database.ref().push().key,
});

const updatePrize = (id: string, text: string): Action => ({
  type: 'UPDATE_PRIZE',
  id,
  text,
});

const updateCategory = (id: string, name: string): Action => ({
  type: 'UPDATE_CATEGORY',
  id,
  name,
});

const addPrizeCategory = (hackathonId: string): Action => ({
  type: 'ADD_PRIZE_CATEGORY',
  hackathonId,
  id: database.ref().push().key,
});

const deleteCategory = (categoryId: string): Action => ({
  type: 'DELETE_CATEGORY',
  categoryId,
});

const updateDate = (id: string, date: Date, dateType: string): Action => {
  return (
  {
    type: 'UPDATE_DATE',
    id,
    date: date.getTime(),
    dateType,
  }
);
};

// const updateDate = (id: string, date: Date, dateType: string): Action => ({
//   type: 'UPDATE_DATE',
//   id,
//   date: String(date.getTime()),
//   dateType,
// });

/**
 * Reduce prizes, prize categories, and hackathons to objects
 * to save back into Firebase.
 */
const saveHackathon = (
  p: Prizes, c: Categories, h: Hackathons
): ThunkAction => async(dispatch): Promise<void> => {
  // prizes
  const prizes = p.reduce((previous, current) => {
    previous[current.id] = current;
    return previous;
  }, {});

  // prize categories
  const categories = c.reduce((previous, current) => {
    previous[current.id] = current;
    return previous;
  }, {});

  // prize hackathons
  const hackathons = h.reduce((previous, current) => {
    previous[current.id] = current;
    return previous;
  }, {});

  // update firebase
  await Promise.all([
    database.ref('hackathons').set(hackathons),
    database.ref('prizes').set(prizes),
    database.ref('categories').set(categories),
  ]);
  dispatch(toggleEditHackathon());
};

module.exports = {
  isAdmin, updateAdmin, invalidApplicant,
  validApplicant, addApplicants, getApplicants,
  detachApplicantListener, addHackathons,
  getHackathons, toggleEditHackathon, deletePrize,
  addPrize, updatePrize, updateCategory,
  addPrizeCategory, deleteCategory, updateDate,
  saveHackathon, addUserToSlack, updateSlackCredentials,
  getSlackCredentials,
};
