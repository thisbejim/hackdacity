const initialState = {
  signIn: {
    open: false,
    loading: false,
    error: null
  }
}

export const dialogs = (state=initialState, action) => {
  switch (action.type) {
    case "TOGGLE_SIGN_IN_DIALOG_OPEN":
      var open = state.signIn.open ? false : true;
      var newState = Object.assign(state.signIn, {open: open, error: null});
      return Object.assign({}, state, {signIn: newState})
    case "SIGN_IN_ERROR":
      var newState = Object.assign(state.signIn, {error: action.error, loading: false});
      return Object.assign({}, state, {signIn: newState})
    case "START_SIGN_IN":
      var newState = Object.assign(state.signIn, {loading: true});
      return Object.assign({}, state, {signIn: newState})
    case "SIGNED_IN":
      var newState = Object.assign(state.signIn, {loading: false});
      return Object.assign({}, state, {signIn: newState})
    default:
      return state
  }
}
