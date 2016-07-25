// @flow
import type { Categories, Submissions, Hackathons, Applicants, Prizes } from '../actions/types';

export type User = {
  signedIn: boolean,
  admin: boolean,
  uid: ?string,
  displayName: ?string
}

type Snackbar = {
  open: boolean,
  message: string
}

export type Navbar = {
  loading: boolean,
  snackbar: Snackbar
}

export type Hackathon = {
  startDate: ?string,
  endDate: ?string,
  id: ?string,
  submissions: Submissions,
  categories: Categories,
  prizes: Prizes,
  tab: ?string
}

type Auth = {
  page: string,
  open: boolean,
  loading: boolean,
  error: ?string,
  name: string,
  email: string,
  password: string
}

export type Dialogs = {
  auth: Auth
}

export type Admin = {
  applicants: Applicants,
  slack: {
    token: ?string
  },
  hackathons: Hackathons,
  currentHackathon: ?string,
  selected: ?string,
  editDisabled: boolean,
  categories: Categories,
  prizes: Prizes
}
