// @flow
import React from 'react';


// material-ui
import {
  Dialog, TextField, FlatButton,
  LinearProgress,
} from 'material-ui';

// actions
import {
  toggleAuthDialogOpen, toggleAuthPage, validateField,
  validateForm,
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
      form={props.state.forms.signIn}
    />
  :
    <SignUpForm
      dispatch={dispatch}
      form={props.state.forms.signUp}
    />;

  const actions = dialog.page === 'signIn'
    ? [
      <FlatButton
        key="openRegisterPageBtn"
        style={style.actionButton}
        label="Join"
        primary
        onTouchTap={() => dispatch(toggleAuthPage())}
      />,
      <FlatButton
        style={style.actionButton}
        label="Sign in"
        onTouchTap={() => dispatch(validateForm(props.state.forms, 'signIn'))}
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
        onTouchTap={() => dispatch(validateForm(props.state.forms, 'signUp'))}
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
      onChange={(evt, value) => props.dispatch(
        validateField('signIn', 'email', value)
      )}
      errorText={props.form.errors.email}
    />
    <br />
    <TextField
      key="Password"
      hintText="Password"
      floatingLabelText="Password"
      fullWidth
      onChange={(evt, value) => props.dispatch(
        validateField('signIn', 'password', value)
      )}
      errorText={props.form.errors.password}
    />
  </span>;

const SignUpForm = (props: FormProps) =>
  <span>
    <TextField
      key="FullName"
      hintText="Full Name"
      floatingLabelText="Full Name"
      fullWidth
      onChange={(evt, value) => props.dispatch(
        validateField('signUp', 'name', value)
      )}
      errorText={props.form.errors.name}
    />
    <br />
    <TextField
      key="UserName"
      hintText="User Name"
      floatingLabelText="User Name"
      fullWidth
      onChange={(evt, value) => props.dispatch(
        validateField('signUp', 'userName', value)
      )}
      errorText={props.form.errors.userName}
    />
    <br />
    <TextField
      key="Email"
      hintText="Udacity Email"
      floatingLabelText="Udacity Email"
      fullWidth
      onChange={(evt, value) => props.dispatch(
        validateField('signUp', 'email', value)
      )}
      errorText={props.form.errors.email}
    />
    <br />
    <TextField
      key="Password"
      hintText="Password"
      floatingLabelText="Password"
      fullWidth
      onChange={(evt, value) => props.dispatch(
        validateField('signUp', 'password', value)
      )}
      errorText={props.form.errors.password}
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
