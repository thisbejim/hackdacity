// @flow

// actions
import { navBarLoadingOn, navBarLoadingOff } from './navbar';
import { checkAuth } from './auth';
import { getHackathon } from './hackathon';

// types
import type { ThunkAction } from './types';

// Start up
const startUp = (): ThunkAction => async(dispatch): Promise<void> => {
  dispatch(navBarLoadingOn());
  await Promise.all([
    dispatch(getHackathon()),
    dispatch(checkAuth()),
  ]);
  dispatch(navBarLoadingOff());
};

module.exports = { startUp };
