const initialState = {
  applicants: [],
  slack: {
    token: null
  }
}

export const admin = (state=initialState, action) => {
  switch (action.type) {
    case "ADD_APPLICANTS":
      return Object.assign({}, state, {applicants: action.applicants})
    case "UPDATE_SLACK_CREDENTIALS":
      return Object.assign({}, state,  {slack: {token: action.token}})
    default:
      return state
  }
}
