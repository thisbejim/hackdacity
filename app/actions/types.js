// All action types
export type Action =
    // navbar
    { type: "NAVBAR_LOADING_ON" }
  | { type: "NAVBAR_LOADING_OFF" }
  | { type: "OPEN_SNACK_BAR", message: string}
  | { type: "CLEAR_SNACK_BAR" }
  // hackathon
  | { type: "UPDATE_CURRENT_HACKATHON", hackathon: Hackathon }
  | { type: "CHANGE_TAB", tab: string }
  | { type: "ADD_SUBMISSIONS", submissions: Submissions}
  // admin
  | { type: "IS_ADMIN", isAdmin: boolean }
  | { type: "ADD_APPLICANTS", applicants: Applicants }
  | {
      type: "ADD_HACKATHONS",
      currentHackathon: string,
      hackathons: Hackathons,
      categories: Categories,
      prizes: Prizes
    }
  | { type: "TOGGLE_EDIT_HACKATHON" }
  | { type: "DELETE_PRIZE", id: string }
  | { type: "ADD_PRIZE", categoryId: string, id: string }
  | { type: "UPDATE_PRIZE", id: string, text: string }
  | { type: "UPDATE_CATEGORY", id: string, name: string }
  | { type: "ADD_PRIZE_CATEGORY", hackId: string, id: string }
  | { type: "DELETE_CATEGORY", categoryId: string }
  | { type: "UPDATE_DATE", id: string, date: number, dateType: string }
  | { type: "UPDATE_SLACK_CREDENTIALS", token: string }
  // auth
  | { type: "TOGGLE_AUTH_DIALOG_OPEN" }
  | { type: "AUTH_MODAL_LOADING_ON" }
  | { type: "AUTH_MODAL_LOADING_OFF" }
  | { type: "TOGGLE_AUTH_PAGE" }
  | { type: "SIGN_IN_ERROR", error: string }
  | { type: "SIGNED_IN", uid: string, displayName?: string }
  | { type: "SIGNED_OUT" }
  ;

export type Hackathons = Array<Hackathon>;

export type Hackathon = {
  startDate: string,
  id: string,
  startDate: string,
  status: string
};

export type Submissions = Array<Submission>;

export type Submission = {
  id: string,
  hackathonId: string,
  votes: Object,
  points: number
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
