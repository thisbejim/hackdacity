// @flow
import type { Action } from '../actions/types';
import type { Forms } from './types';


const initialState = {
  submit: {
    title: '',
    description: '',
    github: '',
    members: [],
    selectedImage: null,
    croppedImage: null,
    hackathonId: null,
    categories: [],
    errors: {
      title: '',
      github: '',
      croppedImage: '',
      categories: '',
    },
  },
  signIn: {
    email: null,
    password: null,
    errors: {
      email: '',
      password: '',
    },
  },
  signUp: {
    name: null,
    userName: null,
    email: null,
    password: null,
    errors: {
      name: '',
      userName: '',
      email: '',
      password: '',
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
      const { form, prop, value } = action;
      const field = { [prop]: value };
      const updated = Object.assign({}, state[form], field);
      return Object.assign({}, state, { [form]: updated });
    }
    case 'ADD_TO_FORM_ARRAY': {
      const { form, prop, value, maxLength } = action;
      if (state[form][prop].length < maxLength) {
        const current = state[form][prop];
        const field = [
          ...current,
          value,
        ];
        const updated = Object.assign({}, state[form], { [prop]: field });
        return Object.assign({}, state, { [form]: updated });
      }
      return state;
    }
    case 'REMOVE_FROM_FORM_ARRAY': {
      const { index, form, prop } = action;
      const value = state[form][prop];
      const field = value.slice(0, index).concat(
        value.slice(index + 1)
      );
      const updated = Object.assign({}, state[form], { [prop]: field });
      return Object.assign({}, state, { [form]: updated });
    }
    case 'UPDATE_FORM_ARRAY': {
      const { index, form, prop, value } = action;
      const field = state[form][prop].map((item, i) => {
        if (index !== i) {
          return item;
        }
        return {
          ...item,
          ...value,
        };
      });
      const updated = Object.assign({}, state[form], { [prop]: field });
      return Object.assign({}, state, { [action.form]: updated });
    }
    case 'FORM_ERROR': {
      const { form, prop, error } = action;
      const value = { [prop]: error };
      const field = Object.assign({}, state[form].errors, value);
      const updated = Object.assign({}, state[form], { errors: field });
      return Object.assign({}, state, { [form]: updated });
    }
    case 'CLEAR_FORM_ERROR': {
      const { form, prop } = action;
      const value = { [prop]: '' };
      const field = Object.assign({}, state[form].errors, value);
      const updated = Object.assign({}, state[form], { errors: field });
      return Object.assign({}, state, { [form]: updated });
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
