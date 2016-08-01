// Forms

// firebase
import { auth, database, storage, firebaseError } from './firebase';

// react-router
import { browserHistory } from 'react-router';

// isGithubUrl
import isGithubUrl from 'is-github-url';

// types
import type { Action } from './types';

// actions
import { authDialogLoadingOn, authDialogLoadingOff, toggleAuthDialogOpen } from './auth';
import { navBarLoadingOn, navBarLoadingOff, openSnackBar } from './navbar';

const updateForm = (form: string, prop: string, value: string): Action => ({
  type: 'UPDATE_FORM',
  form,
  prop,
  value,
});

const processFormImage = (form: string, prop: string, value: string) => (dispatch) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    dispatch(updateForm(form, prop, e.target.result));
  };
  reader.readAsDataURL(value);
};

const validations = {
  submit: {
    title: (value) => {
      if (!value) {
        return { valid: false, message: 'Title required' };
      } else if (value.length < 5) {
        return { valid: false, message: 'Title must be at least 5 characters' };
      } else if (value.length > 25) {
        return { valid: false, message: 'Title must be less than 26 characters' };
      }
      return { valid: true, message: null };
    },
    description: (value) => {
      if (!value) {
        return { valid: false, message: 'Description required' };
      } else if (value.length < 12) {
        return { valid: false, message: 'Description must be at least 12 characters' };
      } else if (value.length > 60) {
        return { valid: false, message: 'Description must be less than 60 characters' };
      }
      return { valid: true, message: null };
    },
    categories: (value) => {
      if (!value.length) {
        return { valid: false, message: 'Please select at least one category' };
      }
      return { valid: true, message: null };
    },
    github: (value) => {
      if (!isGithubUrl(value)) {
        return { valid: false, message: 'Link must be a Github url' };
      }
      return { valid: true, message: null };
    },
    croppedImage: (value) => {
      if (!value) {
        return { valid: false, message: 'Project image required' };
      }
      return { valid: true, message: null };
    },
  },
  signIn: {
  },
  signUp: {
    name: (value) => {
      if (!value) {
        return { valid: false, message: 'Full Name required' };
      }
      return { valid: true, message: null };
    },
    email: (value) => {
      const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      const valid = re.test(value);
      if (!valid) {
        return { valid: false, message: 'Please enter a valid email' };
      }
      return { valid: true, message: null };
    },
    password: (value) => {
      if (!value) {
        return { valid: false, message: 'Password required' };
      } else if (value.length < 6) {
        return { valid: false, message: 'Password must be at least 6 characters' };
      }
      return { valid: true, message: null };
    },
    userName: async(value) => {
      if (!value) {
        return { valid: false, message: 'Username required' };
      } else if (value.length > 12) {
        return { valid: false, message: 'Username must be less than 13 characters' };
      }
      const lowerCaseValue = value.toLowerCase();
      const userNameIsTaken = await database.ref('users').orderByChild('userName')
      .equalTo(lowerCaseValue).once('value');
      if (userNameIsTaken.val()) {
        return { valid: false, message: 'Username is taken' };
      }
      return { valid: true, message: null };
    },
  },
};

const dataURItoBlob = (dataURI) => {
  let i = 0;
  const binary = atob(dataURI.split(',')[1]);
  const array = [];
  while (i < binary.length) {
    array.push(binary.charCodeAt(i));
    i++;
  }
  return new Blob([new Uint8Array(array)], {
    type: 'image/jpeg',
  });
};

const submitForms = {
  submit: async(form, dispatch) => {
    dispatch(navBarLoadingOn());
    form.categories.forEach((categoryId) => {
      const submissionId = database.ref('submissions').push().key;
      const members = form.members.reduce((previous, current) => {
        previous[current.uid] = true;
        return previous;
      }, {});
      const updates = {};
      const image = dataURItoBlob(form.croppedImage);
      const uploadTask = storage.ref().child(`images/${submissionId}.png`).put(image);
      uploadTask.on('state_changed', () => {

      }, () => {

      }, async() => {
        const downloadURL = uploadTask.snapshot.downloadURL;
        const data = {
          hackathonId: form.hackathonId,
          categoryId,
          id: submissionId,
          members,
          image: downloadURL,
          title: form.title,
          description: form.description,
        };
        updates[`/submissions/${submissionId}`] = data;
        await database.ref().update(updates, (e) => console.log(e));
        dispatch(navBarLoadingOff());
        browserHistory.push('/');
        dispatch(openSnackBar('Submission successful'));
      });
    });
  },
  signIn: async(form, dispatch) => {
    try {
      dispatch(authDialogLoadingOn());
      await auth.signInWithEmailAndPassword(form.email, form.password);
      dispatch(toggleAuthDialogOpen());
    } catch (e) {
      dispatch(authDialogLoadingOff());
      dispatch(formError('signIn', 'email', firebaseError(e)));
    }
  },
  signUp: async(form, dispatch) => {
    try {
      dispatch(authDialogLoadingOn());
      const user = await auth.createUserWithEmailAndPassword(form.email, form.password);
      const uid = user.uid;
      // add
      const data = {
        uid,
        name: form.name,
        userName: form.userName,
        signUpDate: new Date().getTime(),
        status: 'unverified',
      };
      const updates = {};
      updates[`/users/${uid}`] = data;
      updates[`/applied/${uid}`] = Object.assign({}, data, { email: form.email });
      await database.ref().update(updates);
      dispatch(toggleAuthDialogOpen());
    } catch (e) {
      dispatch(authDialogLoadingOff());
      dispatch(formError('signUp', 'email', firebaseError(e)));
    }
  },
};

const validateField = (form: string, prop: string, value: string) => async(dispatch) => {
  // check if the specified form has a validation rule for a given field
  if (validations[form].hasOwnProperty(prop)) {
    const { valid, message } = await validations[form][prop](value);
    if (valid) {
      // if valid, clear any errors and update the field value in the store
      dispatch(clearFormError(form, prop));
      dispatch(updateForm(form, prop, value));
    } else {
      // dispatch a form error for this field if it doesn't pass validation
      dispatch(formError(form, prop, message));
    }
  } else {
    // if there are no validation rules for this field
    // update the field value in the store
    dispatch(updateForm(form, prop, value));
  }
};

const validateForm = (state: any, form: string) => async(dispatch) => {
  let isValid = true;
  const formState = state[form];
  // get the keys for each field in this form
  const fields = Object.keys(formState);
  for (const field of fields) {
    if (validations[form].hasOwnProperty(field)) {
      const value = formState[field];
      const { valid, message } = await validations[form][field](value);
      if (!valid) {
        // dispatch error at first invalid value
        isValid = false;
        dispatch(formError(form, field, message));
      }
    }
  }
  // check if all fields are valid
  if (isValid) {
    // submit the form if all fields are valid
    submitForms[form](formState, dispatch);
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

const removeFromFormArray = (index: number, form: string, prop: string): Action => ({
  type: 'REMOVE_FROM_FORM_ARRAY',
  index,
  form,
  prop,
});

const updateAutocomplete = (prop: string, value: Array<string>) => ({
  type: 'UPDATE_AUTOCOMPLETE',
  prop,
  value,
});

const autoComplete = (prop: string, value: string): ThunkAction => async(dispatch) => {
  const auto = await database.ref('users').orderByChild('userName').startAt(value)
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
  updateFormArray, removeFromFormArray,
};
