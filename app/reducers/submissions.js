const initialState = {
  tab: "a"
}

export const submissions = (state=initialState, action) => {
  switch (action.type) {
    case "CHANGE_TAB":
      return Object.assign({}, state, {tab: action.tab})
    default:
      return state
  }
}
