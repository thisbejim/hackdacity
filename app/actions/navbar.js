// @flow

// types
import { Action } from "./types";

// Navbar
const navBarLoadingOn = (): Action => {
  return {
    type: "NAVBAR_LOADING_ON"
  }
}

const navBarLoadingOff = (): Action => {
  return {
    type: "NAVBAR_LOADING_OFF"
  }
}

const openSnackBar = (message: string): Action => {
  return {
    type: "OPEN_SNACK_BAR",
    message: message
  }
}

const clearSnackBar = (): Action => {
  return {
    type: "CLEAR_SNACK_BAR"
  }
}

module.exports = {
  navBarLoadingOn, navBarLoadingOff, openSnackBar,
  clearSnackBar
};
