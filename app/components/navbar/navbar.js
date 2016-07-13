import React from 'react';

// material-ui
import {
  AppBar, FlatButton, FontIcon,
  IconButton, IconMenu, MenuItem,
  LinearProgress
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
    const navbar = this.props.state.navbar;

    const rightNav = user.signedIn
      ? <RightNavLoggedIn dispatch={dispatch} />
      : <RightNavLoggedOut dispatch={dispatch}/ >;

    const loader = navbar.loading
      ? <LinearProgress mode="indeterminate" style={{borderRadius: 0}}/>
      : <div style={{height: 4}}></div>;

    return (
      <span>
        <AppBar
          title="Title"
          iconElementRight={rightNav}
          iconStyleRight={style.icon}
        />
        {loader}
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
