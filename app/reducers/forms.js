// @flow
import type { Action } from '../actions/types';
import type { Forms } from './types';


const initialState = {
  submit: {
    github: '',
    members: [],
  },
};

export const forms = (state : Forms = initialState, action: Action): Forms => {
  switch (action.type) {
    case 'ADD_TO_FORM_ARRAY': {
      if (state[action.form][action.prop].length < action.maxLength) {
        const current = state[action.form][action.prop];
        const value = [
          ...current,
          action.value,
        ];
        const form = Object.assign({}, state[action.form], { [action.prop]: value });
        return Object.assign({}, state, { [action.form]: form });
      }
      return state;
    }
    case 'SIGNED_IN': {
      const { uid, displayName } = action;
      const addUser = [
        ...state.submit.members,
        {
          uid,
          displayName,
        },
      ];
      const form = Object.assign({}, state.submit, { members: addUser });
      return Object.assign({}, state, { submit: form });
    }

    default:
      return state;
  }
};
