const initialState = {
  startDate: null,
  endDate: null,
  id: null,
  submissions: [],
  categories: [],
  tab: null
}

export const hackathon = (state=initialState, action) => {
  switch (action.type) {
    case "UPDATE_CURRENT_HACKATHON":
      var hackathon = action.hackathon;
      return Object.assign({}, state, {
        startDate: hackathon.startDate,
        endDate: hackathon.endDate,
        id: hackathon.id,
        categories: action.categories,
        tab: action.categories[0].id
      })
    case "ADD_SUBMISSIONS":
      return Object.assign({}, state, {submissions: action.submissions})
    case "CHANGE_TAB":
      return Object.assign({}, state, {tab: action.tab})
    default:
      return state
  }
}
