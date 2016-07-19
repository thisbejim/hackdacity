const initialState = {
  hackathon: {}
}

export const dialogs = (state=initialState, action) => {
  switch (action.type) {
    case "UPDATE_CURRENT_HACKATHON":
      return Object.assign({}, state, {hackathon: action.hackathon})
    default:
      return state
  }
}
