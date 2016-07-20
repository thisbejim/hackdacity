import React from 'react';

// react-router
import { browserHistory } from 'react-router';

// material-ui
import {
  AppBar, FlatButton, FontIcon,
  IconButton, IconMenu, MenuItem,
  LinearProgress, Snackbar
} from 'material-ui';
import SvgIcon from 'material-ui/SvgIcon';
import { NavigationMoreVert } from 'material-ui/svg-icons';
import { grey200 } from 'material-ui/styles/colors';

// components
import { RightNavLoggedIn } from "./rightNavLoggedIn";
import { RightNavLoggedOut } from "./rightNavLoggedOut";
import { AuthDialog } from "./authDialog";

import Logo from './h-30.png';

export const NavBar = (props) => {
    const dispatch = props.dispatch;
    const user = props.state.user;
    const navbar = props.state.navbar;

    const rightNav = user.signedIn
      ? <RightNavLoggedIn dispatch={dispatch} />
      : <RightNavLoggedOut dispatch={dispatch}/ >;

    const loader = navbar.loading
      ? <LinearProgress mode="indeterminate" style={style.progress}/>
      : <div style={{height: 4}}></div>;

    return (
      <span>
        <AppBar
          iconElementLeft={<img src={Logo} onClick={() => browserHistory.push('/') }/>}
          iconStyleLeft={style.leftIcon}
          iconElementRight={rightNav}
          iconStyleRight={style.rightIcon}
          showMenuIconButton={true}
          style={style.appBar}
        />
        {loader}
        <AuthDialog state={props.state} dispatch={dispatch} />
        <Snackbar
          open={true}
          message="Your account is awaiting verification"
          autoHideDuration={4000}
        />
      </span>
    )
}

const style = {
  appBar: {
    backgroundColor: "#fff",
    boxShadow: "rgba(0, 0, 0, 0.117647) 0 0 0, rgba(0, 0, 0, 0.117647) 0 0 0",
    borderWidth: 0,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "#dbe2e8"
  },
  progress: {
    borderRadius: 0,
    backgroundColor: "#fff"
  },
  rightIcon: {
    margin: 0
  },
  leftIcon: {
    marginTop: 18,
    marginRight: 0,
    marginLeft: 0
  }
}
