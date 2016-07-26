// Forms
// types
import type { Action } from './types';

const addToFormArray = (form: string, prop: string, value: any, maxLength: number): Action => ({
  type: 'ADD_TO_FORM_ARRAY',
  form,
  prop,
  value,
  maxLength,
});

module.exports = {
  addToFormArray,
};
