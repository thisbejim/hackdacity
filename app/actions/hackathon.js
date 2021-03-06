// @flow

// firebase
import { database } from './firebase';

// types
import type {
  Action, ThunkAction, Hackathon,
  Categories, Prizes,
} from './types';

// actions
import { openSnackBar } from './navbar';

// Actions related to the currently running hackathon
const addSubmissions = (submissions): Action => ({
  type: 'ADD_SUBMISSIONS',
  submissions,
});

const getSubmissions = (hackId: string): ThunkAction => async(dispatch) => {
  database.ref('submissions').orderByChild('hackathonId').equalTo(hackId)
  .on('value', (subs) => {
    const submissions = [];
    // count uids in votes to determine points
    subs.forEach((s) => {
      const submission = s.val();
      const points = s.child('votes').numChildren();
      submissions.push(
        Object.assign({},
          submission,
          {
            votes: submission.votes || {},
            points: String(points),
          }
        )
      );
    });
    dispatch(addSubmissions(submissions));
  });
};

const updateCurrentHackathon = (
  hackathon: Hackathon, categories: Categories, prizes: Prizes
): Action => ({
  type: 'UPDATE_CURRENT_HACKATHON',
  hackathon,
  categories,
  prizes,
});

const getHackathon = (): ThunkAction => async(dispatch): Promise<void> => {
  // fetch the current hackathon's id and get the rest of the hackathon
  const hackId = await database.ref('currentHackathon').once('value');
  const hackathonId = hackId.val();
  const [hackathon, categories, prizes] = await Promise.all([
    database.ref('hackathons').child(hackathonId).once('value'),
    database.ref('categories').orderByChild('hackathonId').equalTo(hackathonId)
    .once('value'),
    database.ref('prizes').orderByChild('hackathonId').equalTo(hackathonId)
    .once('value'),
  ]);
  const cats = Object.values(categories.val() || {});
  const prize = Object.values(prizes.val() || {});
  dispatch(updateCurrentHackathon(hackathon.val(), cats, prize));
  dispatch(getSubmissions(hackathonId));
};

// Submissions
const changeTab = (tab: string): Action => ({
  type: 'CHANGE_TAB',
  tab,
});

const upvote = (submissionId: string, uid: string): ThunkAction => async(dispatch) => {
  try {
    await database.ref('submissions').child(submissionId).child('votes')
    .child(uid)
    .set(true);
  } catch (e) {
    dispatch(openSnackBar('Permission Denied'));
  }
};

const cancelVote = (submissionId: string, uid: string): ThunkAction => async(dispatch) => {
  try {
    await database.ref('submissions').child(submissionId).child('votes')
    .child(uid)
    .set(null);
  } catch (e) {
    dispatch(openSnackBar('Permission Denied'));
  }
};

module.exports = {
  updateCurrentHackathon, getHackathon, changeTab,
  upvote, cancelVote,
};
