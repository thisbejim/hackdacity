const initialState = {
  auth: {
    page: "login",
    open: false,
    loading: false,
    error: null
  }
}

export const dialogs = (state=initialState, action) => {
  switch (action.type) {
    case "TOGGLE_AUTH_DIALOG_OPEN":
      var open = state.auth.open ? false : true;
      var newState = Object.assign(state.auth, {open: open, loading: false, page: "signIn"});
      return Object.assign({}, state, {auth: newState})
    case "TOGGLE_AUTH_PAGE":
      var page = state.auth.page == "signIn" ? "signUp" : "signIn";
      var newState = Object.assign(state.auth, {page: page});
      return Object.assign({}, state, {auth: newState})
    case "SIGN_IN_ERROR":
      var newState = Object.assign(state.auth, {error: action.error, loading: false});
      return Object.assign({}, state, {auth: newState})
    case "AUTH_MODAL_LOADING_ON":
      var newState = Object.assign(state.auth, {loading: true});
      return Object.assign({}, state, {auth: newState})
    case "AUTH_MODAL_LOADING_OFF":
      var newState = Object.assign(state.auth, {loading: false});
      return Object.assign({}, state, {auth: newState})
    default:
      return state
  }
}
