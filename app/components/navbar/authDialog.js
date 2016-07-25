// @flow
import React from 'react';


// material-ui
import {
  Dialog, TextField, FlatButton,
  LinearProgress,
} from 'material-ui';

// actions
import {
  toggleAuthDialogOpen, toggleAuthPage, signIn,
  signUp, updateDialogForm,
} from '../../actions/actions';

// types
import type { Dialogs } from '../../reducers/types';

type State = {
  dialogs: Dialogs
}

type Props = {
  dispatch: () => void,
  state: State
}

export const AuthDialog = (props: Props) => {
  const dispatch = props.dispatch;
  const dialog = props.state.dialogs.auth;
  const loading = dialog.loading ? <LinearProgress mode="indeterminate" /> : null;
  const page = dialog.page === 'signIn'
  ?
    <SignInForm
      dispatch={dispatch}
      name={dialog.name}
      email={dialog.email}
      password={dialog.password}
      error={dialog.error}
    />
  :
    <SignUpForm
      dispatch={dispatch}
      name={dialog.name}
      email={dialog.email}
      password={dialog.password}
      error={dialog.error}
    />;

  const actions = dialog.page === 'signIn'
    ? [
      <FlatButton
        key="openRegisterPageBtn"
        style={style.actionButton}
        label="Create an account"
        primary
        onTouchTap={() => dispatch(toggleAuthPage())}
      />,
      <FlatButton
        style={style.actionButton}
        label="Sign in"
        onTouchTap={() => dispatch(signIn(dialog.email, dialog.password))}
      />,
      loading,
    ]
    : [
      <FlatButton
        key="openSignInPageBtn"
        style={style.actionButton}
        label="Back"
        primary
        onTouchTap={() => dispatch(toggleAuthPage())}
      />,
      <FlatButton
        style={style.actionButton}
        label="Sign Up"
        onTouchTap={() => dispatch(signUp(dialog.name, dialog.email, dialog.password))}
      />,
      loading,
    ];

  const title = dialog.page === 'signIn' ? 'Have an account?' : 'Join Hackdacity';

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
  );
};

type FormProps = {
  dispatch: () => void,
  name: string,
  email: string,
  password: string,
  error: ?string
}

const SignInForm = (props: FormProps) =>
  <span>
    <TextField
      key="Email"
      hintText="Email"
      floatingLabelText="Email"
      fullWidth
      value={props.email}
      onChange={(evt, value) => props.dispatch(
        updateDialogForm('auth', 'email', value)
      )}
    />
    <br />
    <TextField
      key="Password"
      hintText="Password"
      floatingLabelText="Password"
      fullWidth
      value={props.password}
      onChange={(evt, value) => props.dispatch(
        updateDialogForm('auth', 'password', value)
      )}
      errorText={props.error}
    />
  </span>;

const SignUpForm = (props: FormProps) =>
  <span>
    <TextField
      key="FullName"
      hintText="Full Name"
      floatingLabelText="Full Name"
      fullWidth
      value={props.name}
      onChange={(evt, value) => props.dispatch(
        updateDialogForm('auth', 'name', value)
      )}
    />
    <br />
    <TextField
      key="Email"
      hintText="Email"
      floatingLabelText="Email"
      fullWidth
      value={props.email}
      onChange={(evt, value) => props.dispatch(
        updateDialogForm('auth', 'email', value)
      )}
    />
    <br />
    <TextField
      key="Password"
      hintText="Password"
      floatingLabelText="Password"
      fullWidth
      value={props.password}
      onChange={(evt, value) => props.dispatch(
        updateDialogForm('auth', 'password', value)
      )}
      errorText={props.error}
    />
  </span>;

const style = {
  actionContainer: {
    padding: '0 0 0 0',
  },
  actionButton: {
    margin: '0 8px 8px 8px',
  },
  dialog: {
    maxWidth: 400,
  },
};
