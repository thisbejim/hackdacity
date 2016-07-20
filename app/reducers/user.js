const initialState = {
  signedIn: false,
  admin: false,
  uid: null,
  displayName: null
}

export const user = (state=initialState, action) => {
  switch (action.type) {
    case "SIGNED_IN":
      return Object.assign({}, state, {
        signedIn: true,
        uid: action.uid,
        displayName: action.displayName
      })
    case "SIGNED_OUT":
      return Object.assign({}, state, {signedIn: false})
    case "IS_ADMIN":
      return Object.assign({}, state, {admin: action.isAdmin})
    default:
      return state
  }
}
