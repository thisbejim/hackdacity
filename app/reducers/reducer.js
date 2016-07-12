import { combineReducers } from 'redux';
import { user } from './user';
import { dialogs } from './dialogs';
import { admin } from './admin';

export const reducer = combineReducers({
  user,
  dialogs,
  admin
});
