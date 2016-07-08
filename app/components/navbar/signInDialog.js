import React from 'react';

// material-ui
import {
  Dialog, TextField, FlatButton,
  LinearProgress
} from 'material-ui';

// actions
import { toggleSignInDialogOpen, signIn } from "../../actions/actions";

export class SignInDialog extends React.Component {
  render() {
    const dispatch = this.props.dispatch;
    const dialog = this.props.state.dialogs.signIn;
    let email, password;

    const loading = dialog.loading ? <LinearProgress mode="indeterminate" /> : null;
    const actions = [
      <FlatButton
        style={style.actionButton}
        label="Sign in"
        primary={true}
        onTouchTap={() => dispatch(signIn(email, password))}
      />,
      loading
    ];

    return (
      <div>
        <Dialog
          modal={false}
          open={dialog.open}
          onRequestClose={() => dispatch(toggleSignInDialogOpen())}
          actions={actions}
          actionsContainerStyle={style.actionContainer}
          contentStyle={style.dialog}
        >
          <TextField
            hintText="Email"
            floatingLabelText="Email"
            fullWidth={true}
            onChange={(evt, value) => email = value}
          />
          <br />
          <TextField
            hintText="Password"
            floatingLabelText="Password"
            fullWidth={true}
            onChange={(evt, value) => password = value}
            errorText={dialog.error}
          />
        </Dialog>
      </div>
    )
  }
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
