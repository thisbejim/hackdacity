import React from 'react';

// material-ui
import { Dialog, TextField } from 'material-ui';

export class Login extends React.Component {
  render() {
    const open = this.props.state.dialogs.login;
    return (
      <div>
        <Dialog
          title="Dialog With Actions"
          modal={false}
          open={open}
        >
          The actions in this window were passed in as an array of React objects.
        </Dialog>
      </div>
    )
  }
}
