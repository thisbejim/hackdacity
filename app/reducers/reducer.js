// @flow
import { combineReducers } from 'redux';
import { user } from './user';
import { dialogs } from './dialogs';
import { admin } from './admin';
import { navbar } from './navbar';
import { hackathon } from './hackathon';
import { forms } from './forms';

export const reducer = combineReducers({
  user,
  dialogs,
  admin,
  navbar,
  hackathon,
  forms,
});
