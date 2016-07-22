// @flow

// firebase
import { auth, database } from "./firebase";

// actions
import { navBarLoadingOn, navBarLoadingOff } from "./navbar";

// types
import {
  Action, Hackathon, Hackathons,
  Prizes, Categories, Applicants,
  ThunkAction
} from "./types";

// Admin permission checks
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

// Approval Page
const invalidApplicant = (user_id: string): ThunkAction => {
  return async(dispatch): Promise<void> => {
    await database.ref("applied").child(user_id).remove();
  }
}

const validApplicant = (user_id: string, name: string, email: string, token: string): ThunkAction => {
  return async(dispatch): Promise<void> => {
    try {
      await Promise.all([
        database.ref("alumni").child(user_id).set(true),
        database.ref("applied").child(user_id).remove(),
        database.ref("users").child(user_id).set({name: name}),
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

const getApplicants = (): ThunkAction => {
  return (dispatch): void => {
    dispatch(navBarLoadingOn());
    database.ref("applied").orderByChild("date").on('value', (snapshot) => {
      const applicants = Object.values(snapshot.val());
      dispatch(navBarLoadingOff());
      dispatch(addApplicants(applicants));
    });
  }
}

const detachApplicantListener = (): ThunkAction => {
  return (dispatch): void => {
    database.ref("applied").off('value');
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

const getSlackCredentials = (): ThunkAction => {
  return async(dispatch): Promise<void> => {
    const slack = await database.ref("slack").once('value');
    dispatch(updateSlackCredentials(slack.val().token));
  }
}

// Dashboard Page
const addHackathons = (currentHackathon: string, hackathons: Hackathons, categories: Categories, prizes: Prizes): Action => {
  return {
    type: "ADD_HACKATHONS",
    currentHackathon: currentHackathon,
    hackathons: hackathons,
    categories: categories,
    prizes: prizes
  }
}

/**
 * Convert prizes, prize categories, and hackathons fetched from firebase
 * to arrays for easy manipulation in the reducer.
 */
const getHackathons = (): ThunkAction => {
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
      addHackathons(
        current.val(),
        Object.values(hackathons.val() || {}),
        Object.values(categories.val() || {}),
        Object.values(prizes.val() || {})
      )
    );
    dispatch(navBarLoadingOff());
  }
}

const toggleEditHackathon = (): Action => {
  return {
    type: "TOGGLE_EDIT_HACKATHON"
  }
}

const deletePrize = (id: string): Action => {
  return {
    type: "DELETE_PRIZE",
    id: id
  }
}

const addPrize = (categoryId: string): Action => {
  return {
    type: "ADD_PRIZE",
    categoryId: categoryId,
    id: database.ref().push().key
  }
}

const updatePrize = (id: string, text: string): Action => {
  return {
    type: "UPDATE_PRIZE",
    id: id,
    text: text
  }
}

const updateCategory = (id: string, name: string): Action => {
  return {
    type: "UPDATE_CATEGORY",
    id: id,
    name: name
  }
}

const addPrizeCategory = (hackathonId: string): Action => {
  return {
    type: "ADD_PRIZE_CATEGORY",
    hackathonId: hackathonId,
    id: database.ref().push().key
  }
}

const deleteCategory = (categoryId: string): Action => {
  return {
    type: "DELETE_CATEGORY",
    categoryId: categoryId
  }
}

const updateDate = (id: string, date: Date, dateType: string): Action => {
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
const saveHackathon = (p: Prizes, c: Categories, h: Hackathons): ThunkAction => {
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

module.exports = {
  isAdmin, updateAdmin, invalidApplicant,
  validApplicant, addApplicants, getApplicants,
  detachApplicantListener, addHackathons,
  getHackathons, toggleEditHackathon, deletePrize,
  addPrize, updatePrize, updateCategory,
  addPrizeCategory, deleteCategory, updateDate,
  saveHackathon, addUserToSlack, updateSlackCredentials,
  getSlackCredentials
};
