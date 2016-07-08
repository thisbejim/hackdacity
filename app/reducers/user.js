const initialState = {
  signedIn: false
}

export const user = (state=initialState, action) => {
  switch (action.type) {
    case "SIGNED_IN":
      return Object.assign({}, state, {signedIn: true})
    case "SIGNED_OUT":
    return Object.assign({}, state, {signedIn: false})
    default:
      return state
  }
}
