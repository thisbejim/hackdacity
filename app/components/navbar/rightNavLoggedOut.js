import React from 'react';

// react-router
import { browserHistory } from 'react-router'


// material-ui
import { FlatButton } from 'material-ui';

// actions
import { toggleSignInDialogOpen } from "../../actions/actions";

export class RightNavLoggedOut extends React.Component {
  render() {
    return (
      <p>
        <FlatButton label="Rules" onTouchTap={() => browserHistory.push('/rules') }/>
        <FlatButton label="Prizes" onTouchTap={() => browserHistory.push('/prizes') }/>
        <FlatButton label="Sign In" onTouchTap={() => this.props.dispatch(toggleSignInDialogOpen())}/>
      </p>
    )
  }
}