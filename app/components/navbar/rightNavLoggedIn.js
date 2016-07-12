import React from 'react';

// react-router
import { browserHistory } from 'react-router';

// material-ui
import { FlatButton, IconButton, IconMenu, MenuItem } from 'material-ui';
import { NavigationMoreVert } from 'material-ui/svg-icons';

// actions
import { signOut } from "../../actions/actions";

export class RightNavLoggedIn extends React.Component {
  render() {
    return (
      <span>
        <FlatButton label="Admin" onTouchTap={() => browserHistory.push('/admin') }/>
        <FlatButton label="Rules" onTouchTap={() => browserHistory.push('/rules') }/>
        <FlatButton label="Prizes" onTouchTap={() => browserHistory.push('/prizes') }/>
          <IconMenu
            iconButtonElement={
              <IconButton style={style.iconButton} iconStyle={style.icon}>
                <NavigationMoreVert />
              </IconButton>
            }
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          >
            <MenuItem primaryText="Help" />
            <MenuItem primaryText="Sign out" onTouchTap={() => this.props.dispatch(signOut())}/>
          </IconMenu>
      </span>
    )
  }
}

const style = {
  icon: {
    width: 24,
    height: 24
  },
  iconButton: {
    top: 7
  }
};
