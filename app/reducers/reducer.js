import { combineReducers } from 'redux';
import { user } from './user';
import { dialogs } from './dialogs';

export const reducer = combineReducers({
  user,
  dialogs
});
