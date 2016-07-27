// Forms
// firebase
import {
  database,
} from './firebase';
// isGithubUrl
import isGithubUrl from 'is-github-url';

// types
import type { Action } from './types';

const updateForm = (form: string, prop: string, value: string): Action => ({
  type: 'UPDATE_FORM',
  form,
  prop,
  value,
});

const processFormImage = (form: string, prop: string, value: string) => (dispatch) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const image = new Image();
    image.src = e.target.result;
    image.onload = () => {
      if (image.width !== 350 && image.height !== 350) {
        dispatch(formError(form, prop, 'Image must be 350x350.'));
      } else {
        dispatch(updateForm(form, prop, e.target.result));
      }
    };
  };
  reader.readAsDataURL(value);
};

const validations = {
  submit: {
    title: (value) => {
      if (!value) {
        return { valid: false, message: 'Title required' };
      } else if (value.length < 5) {
        return { valid: false, message: 'Title must be longer than 5 characters' };
      } else if (value.length > 25) {
        return { valid: false, message: 'Title must be less than 25 characters' };
      }
      return { valid: true, message: null };
    },
    github: (value) => {
      if (!isGithubUrl(value)) {
        return { valid: false, message: 'Link must be a Github url' };
      }
      return { valid: true, message: null };
    },
  },
};

const submitForms = {
  submit: async(form) => {
    form.categories.forEach((categoryId) => {
      const submissionId = database.ref('submissions').push().key;
      const members = form.members.reduce((previous, current) => {
        previous[current.uid] = true;
        return previous;
      }, {});
      const updates = {};
      const data = {
        hackathonId: form.hackathonId,
        categoryId,
        id: submissionId,
        members: members,
      };
      console.log(data)
      updates[`/submission/${submissionId}`] = data;
      database.ref().update(updates, (e) => console.log(e));
    });
  },
};

const validateForm = (state: any, form: string) => (dispatch) => {
  // get form state
  const currentForm = state[form];
  // get field keys
  const fields = Object.keys(currentForm);
  // check if all fields are valid,
  // dispatch error at first invalid value
  const notValid = fields.some((field) => {
    if (validations[form].hasOwnProperty(field)) {
      const value = currentForm[field];
      const { valid, message } = validations[form][field](value);
      if (!valid) {
        dispatch(formError(form, field, message));
      }
      return message;
    }
    return false;
  });
  if (!notValid) {
    submitForms[form](currentForm);
  }
};

const validateField = (form: string, prop: string, value: string) => (dispatch) => {
  const { valid, message } = validations[form][prop](value);
  if (valid) {
    dispatch(clearFormError(form, prop));
    dispatch(updateForm(form, prop, value));
  } else {
    dispatch(formError(form, prop, message));
  }
};

const formError = (form: string, prop: string, error: string) => ({
  type: 'FORM_ERROR',
  form,
  prop,
  error,
});

const clearFormError = (form: string, prop: string) => ({
  type: 'CLEAR_FORM_ERROR',
  form,
  prop,
});

const addToFormArray = (form: string, prop: string, value: any, maxLength: number): Action => ({
  type: 'ADD_TO_FORM_ARRAY',
  form,
  prop,
  value,
  maxLength,
});

const updateFormArray = (index: number, form: string, prop: string, value: any): Action => ({
  type: 'UPDATE_FORM_ARRAY',
  index,
  form,
  prop,
  value,
});

const updateAutocomplete = (prop: string, value: Array<string>) => ({
  type: 'UPDATE_AUTOCOMPLETE',
  prop,
  value,
});

const autoComplete = (prop: string, value: string): ThunkAction => async(dispatch) => {
  const auto = await database.ref('alumni').orderByChild('userName').startAt(value)
  .limitToFirst(5)
  .once('value');
  const autoVal = auto.val();
  if (autoVal) {
    const unpacked = Object.keys(autoVal).map((key) => autoVal[key]);
    dispatch(updateAutocomplete(prop, unpacked));
  }
};

module.exports = {
  addToFormArray, autoComplete, updateForm,
  processFormImage, validateField, validateForm,
  updateFormArray,
};
