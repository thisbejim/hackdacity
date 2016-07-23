// @flow
import type { Action } from '../actions/types';
import type { Hackathon } from './types';

const initialState = {
  startDate: null,
  endDate: null,
  id: null,
  submissions: [],
  categories: [],
  tab: null,
};

export const hackathon = (state : Hackathon = initialState, action: Action): Hackathon => {
  switch (action.type) {
    case 'UPDATE_CURRENT_HACKATHON': {
      const hack = action.hackathon;
      return Object.assign({}, state, {
        startDate: hack.startDate,
        endDate: hack.endDate,
        id: hack.id,
        categories: action.categories,
        tab: action.categories[0].id,
      });
    }
    case 'ADD_SUBMISSIONS':
      return Object.assign({}, state, { submissions: action.submissions });
    case 'CHANGE_TAB':
      return Object.assign({}, state, { tab: action.tab });
    default:
      return state;
  }
};
