// @flow
import type { Action } from '../actions/types';
import type { Forms } from './types';


const initialState = {
  submit: {
    title: '',
    github: '',
    members: [],
    image: null,
    hackathonId: null,
    categories: ['-KNVxyrOenoOiD3jwZqi'],
    errors: {
      title: '',
      github: '',
      image: '',
    },
  },
  autoComplete: {
    members: [],
  },
};

export const forms = (state : Forms = initialState, action: Action): Forms => {
  switch (action.type) {
    case 'UPDATE_CURRENT_HACKATHON': {
      const value = { hackathonId: action.hackathon.id };
      const form = Object.assign({}, state.submit, value);
      return Object.assign({}, state, { submit: form });
    }
    case 'UPDATE_FORM': {
      const value = { [action.prop]: action.value };
      const form = Object.assign({}, state[action.form], value);
      return Object.assign({}, state, { [action.form]: form });
    }
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
    case 'UPDATE_FORM_ARRAY': {
      const { index, form, prop, value } = action;
      const items = state[form][prop].map((item, i) => {
        if (index !== i) {
          return item;
        }
        return {
          ...item,
          ...value,
        };
      });
      const newState = Object.assign({}, state[form], { [prop]: items });
      return Object.assign({}, state, { [action.form]: newState });
    }
    case 'FORM_ERROR': {
      const value = { [action.prop]: action.error };
      const error = Object.assign({}, state[action.form].errors, value);
      const form = Object.assign({}, state[action.form], { errors: error });
      return Object.assign({}, state, { [action.form]: form });
    }
    case 'CLEAR_FORM_ERROR': {
      const value = { [action.prop]: '' };
      const error = Object.assign({}, state[action.form].errors, value);
      const form = Object.assign({}, state[action.form], { errors: error });
      return Object.assign({}, state, { [action.form]: form });
    }
    case 'SIGNED_IN': {
      const { uid, userName } = action;
      const addUser = [
        ...state.submit.members,
        {
          uid,
          userName,
        },
      ];
      const form = Object.assign({}, state.submit, { members: addUser });
      return Object.assign({}, state, { submit: form });
    }
    case 'UPDATE_AUTOCOMPLETE': {
      const form = Object.assign({}, state.autoComplete, { [action.prop]: action.value });
      return Object.assign({}, state, { autoComplete: form });
    }
    case 'ClEAR_AUTOCOMPLETE': {
      const form = Object.assign({}, state.autoComplete, { [action.prop]: [] });
      return Object.assign({}, state, { autoComplete: form });
    }

    default:
      return state;
  }
};
