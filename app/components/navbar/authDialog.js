import React from 'react';

// material-ui
import {
  Dialog, TextField, FlatButton,
  LinearProgress
} from 'material-ui';

// actions
import { toggleAuthDialogOpen, toggleAuthPage, signIn, signUp } from "../../actions/actions";

export const AuthDialog = (props) => {
    const dispatch = props.dispatch;
    const dialog = props.state.dialogs.auth;
    let email, password, name;
    const loading = dialog.loading ? <LinearProgress mode="indeterminate" /> : null;

    const page = dialog.page == "signIn"
      ? (
        <span>
          <TextField
            key="Email"
            hintText="Email"
            floatingLabelText="Email"
            fullWidth={true}
            onChange={(evt, value) => email = value}
          />
          <br />
          <TextField
            key="Password"
            hintText="Password"
            floatingLabelText="Password"
            fullWidth={true}
            onChange={(evt, value) => password = value}
          />
        </span>
      )
      : (
        <span>
          <TextField
            key="FullName"
            hintText="Full Name"
            floatingLabelText="Full Name"
            fullWidth={true}
            onChange={(evt, value) => name = value}
          />
          <br />
          <TextField
            key="Email"
            hintText="Email"
            floatingLabelText="Your Udacity Email"
            fullWidth={true}
            onChange={(evt, value) => email = value}
          />
          <br />
          <TextField
            key="Password"
            hintText="Password"
            floatingLabelText="Password"
            fullWidth={true}
            onChange={(evt, value) => password = value}
          />
        </span>
      );

    const actions = dialog.page == "signIn"
      ? [
        <FlatButton
          key="openRegisterPageBtn"
          style={style.actionButton}
          label="Create an account"
          primary={true}
          onTouchTap={() => dispatch(toggleAuthPage())}
        />,
        <FlatButton
          style={style.actionButton}
          label="Sign in"
          onTouchTap={() => dispatch(signIn(email, password))}
        />,
        loading
      ]
      : [
        <FlatButton
          key="openSignInPageBtn"
          style={style.actionButton}
          label="Back"
          primary={true}
          onTouchTap={() => dispatch(toggleAuthPage())}
        />,
        <FlatButton
          style={style.actionButton}
          label="Sign Up"
          onTouchTap={() => dispatch(signUp(name, email, password))}
        />,
        loading
      ];

    const title = dialog.page == "signIn" ? "Have an account?" : "Join Hackdacity";

    return (
      <div>
        <Dialog
          modal={false}
          open={dialog.open}
          onRequestClose={() => dispatch(toggleAuthDialogOpen())}
          actions={actions}
          actionsContainerStyle={style.actionContainer}
          contentStyle={style.dialog}
        >
          {title}
          {page}
        </Dialog>
      </div>
    )
}

const style = {
  actionContainer: {
    padding: "0 0 0 0"
  },
  actionButton: {
    margin: "0 8px 8px 8px"
  },
  dialog: {
    maxWidth: 400
  }
}
