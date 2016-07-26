// @flow
// All action types
export type Action =
    // navbar
    { type: 'NAVBAR_LOADING_ON' }
  | { type: 'NAVBAR_LOADING_OFF' }
  | { type: 'OPEN_SNACK_BAR', message: string}
  | { type: 'CLEAR_SNACK_BAR' }
  // hackathon
  | {
      type: 'UPDATE_CURRENT_HACKATHON',
      hackathon: Hackathon,
      categories: Categories,
      prizes: Prizes,
    }
  | { type: 'CHANGE_TAB', tab: string }
  | { type: 'ADD_SUBMISSIONS', submissions: Submissions}
  // admin
  | { type: 'IS_ADMIN', isAdmin: boolean }
  | { type: 'ADD_APPLICANTS', applicants: Applicants }
  | {
      type: 'ADD_HACKATHONS',
      currentHackathon: string,
      hackathons: Hackathons,
      categories: Categories,
      prizes: Prizes
    }
  | { type: 'TOGGLE_EDIT_HACKATHON' }
  | { type: 'DELETE_PRIZE', id: string }
  | { type: 'ADD_PRIZE', categoryId: string, hackathonId: string, id: string }
  | { type: 'UPDATE_PRIZE', id: string, text: string }
  | { type: 'UPDATE_CATEGORY', id: string, name: string }
  | { type: 'ADD_PRIZE_CATEGORY', hackathonId: string, id: string }
  | { type: 'DELETE_CATEGORY', categoryId: string }
  | { type: 'UPDATE_DATE', id: string, date: number, dateType: string }
  | { type: 'UPDATE_SLACK_CREDENTIALS', token: string }
  // auth
  | { type: 'TOGGLE_AUTH_DIALOG_OPEN' }
  | { type: 'AUTH_MODAL_LOADING_ON' }
  | { type: 'AUTH_MODAL_LOADING_OFF' }
  | { type: 'UPDATE_DIALOG_FORM', form: string, prop: string, value: string}
  | { type: 'TOGGLE_AUTH_PAGE', name: string, email: string, password: string }
  | { type: 'SIGN_IN_ERROR', error: string }
  | { type: 'SIGNED_IN', uid: string, displayName?: string }
  | { type: 'SIGNED_OUT' }
  // forms
  | { type: 'ADD_TO_FORM_ARRAY', form: string, prop: string, value: any, maxLength: number }
  ;

export type Hackathons = Array<Hackathon>;

export type Hackathon = {
  startDate: number,
  id: string,
  endDate: number,
  status: string
};

export type Submissions = Array<Submission>;

export type Submission = {
  id: string,
  hackathonId: string,
  votes: Object,
  points: number,
  categoryId: string
};

export type Applicants = Array<Applicant>;

type Applicant = {
  email: string,
  id: string,
  name: string
};

export type Prizes = Array<Prize>;

type Prize = {
  categoryId: string,
  id: string,
  text: string
}

export type Categories = Array<Category>;

type Category = {
  hackathonId: string,
  id: string,
  name: string
}

export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;
