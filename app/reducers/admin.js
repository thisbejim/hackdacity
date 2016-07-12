const initialState = {
  applicants: []
}

export const admin = (state=initialState, action) => {
  switch (action.type) {
    case "ADD_APPLICANTS":
      return Object.assign({}, state, {applicants: action.applicants})
    default:
      return state
  }
}
