import { combineReducers } from 'redux';
import { user } from './user';
import { dialogs } from './dialogs';
import { admin } from './admin';
import { navbar } from './navbar';
import { submissions } from './submissions';
import { hackathon } from './hackathon';

export const reducer = combineReducers({
  user,
  dialogs,
  admin,
  navbar,
  submissions,
  hackathon
});
