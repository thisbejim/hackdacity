import React from 'react';

// react-router
import { browserHistory } from 'react-router';

// material-ui
import { FlatButton, IconButton, IconMenu, MenuItem } from 'material-ui';
import { NavigationMoreVert } from 'material-ui/svg-icons';

// components
import {
  Row, Column
} from '../grid/grid';

// actions
import { signOut } from "../../actions/actions";

export const RightNavLoggedIn = (props) => {
    return (
      <Row>
        {/* desktop/iPad */}
        <Column md={12} hiddenXs={true}>
          <FlatButton label="Admin" onTouchTap={() => browserHistory.push('/admin/dashboard') }/>
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
            <MenuItem primaryText="Sign out" onTouchTap={() => props.dispatch(signOut())}/>
          </IconMenu>
        </Column>
        {/* mobile */}
        <Column md={12} visibleXs={true}>
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
            <MenuItem primaryText="Sign out" onTouchTap={() => props.dispatch(signOut())}/>
          </IconMenu>
        </Column>
      </Row>
    )
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
