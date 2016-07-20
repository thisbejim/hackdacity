const initialState = {
  startDate: null,
  endDate: null,
  id: null
}

export const hackathon = (state=initialState, action) => {
  switch (action.type) {
    case "UPDATE_CURRENT_HACKATHON":
      var hackathon = action.hackathon;
      return Object.assign({}, state, {
        startDate: hackathon.startDate,
        endDate: hackathon.endDate,
        id: hackathon.id
      })
    default:
      return state
  }
}
