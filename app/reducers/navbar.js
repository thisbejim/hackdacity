const initialState = {
  loading: false
}

export const navbar = (state=initialState, action) => {
  switch (action.type) {
    case "NAVBAR_LOADING_ON":
      return Object.assign({}, state, {loading: true})
    case "NAVBAR_LOADING_OFF":
      return Object.assign({}, state, {loading: false})
    default:
      return state
  }
}
