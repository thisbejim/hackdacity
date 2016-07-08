import React from 'react';

// material-ui
import {
  AppBar, FlatButton, FontIcon,
  IconButton, IconMenu, MenuItem
} from 'material-ui';
import { NavigationMoreVert } from 'material-ui/svg-icons';
import { grey200 } from 'material-ui/styles/colors';

// components
import { RightNavLoggedIn } from "./rightNavLoggedIn";
import { RightNavLoggedOut } from "./rightNavLoggedOut";
import { SignInDialog } from "./signInDialog";

export class NavBar extends React.Component {
  render() {
    const dispatch = this.props.dispatch;
    const user = this.props.state.user;

    const rightNav = user.signedIn
      ? <RightNavLoggedIn dispatch={dispatch} />
      : <RightNavLoggedOut dispatch={dispatch}/ >;

    return (
      <span>
        <AppBar
          title="Title"
          iconElementRight={rightNav}
          iconStyleRight={style.icon}
        />
        <SignInDialog state={this.props.state} dispatch={dispatch} />
      </span>
    )
  }
}

const style = {
  icon: {
    margin: 0
  }
}
