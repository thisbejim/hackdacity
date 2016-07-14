import React from 'react';

// react-router
import { browserHistory } from 'react-router';

// material-ui
import { FlatButton } from 'material-ui';

// actions
import { toggleAuthDialogOpen } from "../../actions/actions";

export class RightNavLoggedOut extends React.Component {
  render() {
    return (
      <p>
        <FlatButton label="Admin" onTouchTap={() => browserHistory.push('/admin') }/>
        <FlatButton label="Rules" onTouchTap={() => browserHistory.push('/rules') }/>
        <FlatButton label="Prizes" onTouchTap={() => browserHistory.push('/prizes') }/>
        <FlatButton label="Sign In" onTouchTap={() => this.props.dispatch(toggleAuthDialogOpen())}/>
      </p>
    )
  }
}
