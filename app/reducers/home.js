const initialState = {
  hackathon: {
    startDate: null,
    endDate: null
  }
}

export const home = (state=initialState, action) => {
  switch (action.type) {
    case "UPDATE_CURRENT_HACKATHON":
      return Object.assign({}, state, {hackathon: action.hackathon})
    default:
      return state
  }
}
