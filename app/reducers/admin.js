// @flow
import type { Action } from '../actions/types';
import type { Admin } from './types';

const initialState: Admin = {
  applicants: [],
  slack: {
    token: null,
  },
  hackathons: [],
  currentHackathon: null,
  selected: null,
  editDisabled: true,
  categories: [],
  prizes: [],
};

export const admin = (state : Admin = initialState, action: Action): Admin => {
  switch (action.type) {
    // approve
    case 'ADD_APPLICANTS':
      return Object.assign({}, state, { applicants: action.applicants });

    case 'UPDATE_SLACK_CREDENTIALS':
      return Object.assign({}, state, { slack: { token: action.token } });

    // dashboard
    case 'ADD_HACKATHONS':
      return Object.assign({}, state, {
        hackathons: action.hackathons,
        currentHackathon: action.currentHackathon,
        selected: action.currentHackathon,
        categories: action.categories,
        prizes: action.prizes,
      });

    case 'TOGGLE_EDIT_HACKATHON': {
      const edit = state.editDisabled === false;
      return Object.assign({}, state, { editDisabled: edit });
    }

    case 'DELETE_PRIZE': {
      const index = state.prizes.findIndex((p) => p.id === action.id);
      const prizes = state.prizes.slice(0, index).concat(
        state.prizes.slice(index + 1)
      );
      return Object.assign({}, state, { prizes });
    }

    case 'ADD_PRIZE': {
      const prizes = [
        ...state.prizes,
        {
          categoryId: action.categoryId,
          hackathonId: action.hackathonId,
          id: action.id,
          text: '',
        },
      ];
      return Object.assign({}, state, { prizes });
    }

    case 'UPDATE_PRIZE': {
      const prizes = state.prizes.map((prize) => {
        if (prize.id !== action.id) {
          return prize;
        }
        return {
          ...prize,
          text: action.text,
        };
      });
      return Object.assign({}, state, { prizes });
    }

    case 'ADD_PRIZE_CATEGORY': {
      const categories = [
        ...state.categories,
        {
          hackathonId: action.hackathonId,
          id: action.id,
          name: '',
        },
      ];
      return Object.assign({}, state, { categories });
    }

    case 'UPDATE_CATEGORY': {
      const categories = state.categories.map((category) => {
        if (category.id !== action.id) {
          return category;
        }
        return {
          ...category,
          name: action.name,
        };
      });
      return Object.assign({}, state, { categories });
    }

    case 'DELETE_CATEGORY': {
      const categories = state.categories.filter((c) => c.id !== action.categoryId);
      const prizes = state.prizes.filter((p) => p.categoryId !== action.categoryId);
      return Object.assign({}, state, {
        categories,
        prizes,
      });
    }

    case 'UPDATE_DATE': {
      const hackathons = state.hackathons.map((hackathon) => {
        if (hackathon.id !== action.id) {
          return hackathon;
        }
        if (action.dateType === 'startDate') {
          return {
            ...hackathon,
            startDate: action.date,
          };
        }
        return {
          ...hackathon,
          endDate: action.date,
        };
      });
      return Object.assign({}, state, { hackathons });
    }

    default:
      return state;
  }
};
