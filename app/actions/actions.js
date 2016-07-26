import adminActions from './admin';
import authActions from './auth';
import hackathonActions from './hackathon';
import navbarActions from './navbar';
import startUpActions from './startup';
import formActions from './forms';

module.exports = {
  ...startUpActions,
  ...adminActions,
  ...authActions,
  ...hackathonActions,
  ...navbarActions,
  ...formActions,
};
