const initialState = {
  applicants: [],
  slack: {
    token: null
  },
  hackathons: [],
  currentHackathon: null,
  selected: null
}

export const admin = (state=initialState, action) => {
  switch (action.type) {
    // approve
    case "ADD_APPLICANTS":
      return Object.assign({}, state, {applicants: action.applicants})
    case "UPDATE_SLACK_CREDENTIALS":
      return Object.assign({}, state,  {slack: {token: action.token}})
    // dashboard
    case "ADD_HACKATHONS":
      console.log(action)
      return Object.assign(
        {},
        state,
        {
          hackathons: action.hackathons,
          currentHackathon: action.currentHackathon,
          selected: action.currentHackathon
        }
      )
    default:
      return state
  }
}
