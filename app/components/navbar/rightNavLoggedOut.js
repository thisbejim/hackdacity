import React from 'react';

// react-router
import { browserHistory } from 'react-router';

// material-ui
import { FlatButton, IconButton, IconMenu, MenuItem } from 'material-ui';
import { NavigationMoreVert } from 'material-ui/svg-icons';

// components
import { Row, Column } from '../grid/grid';

// actions
import { toggleAuthDialogOpen } from "../../actions/actions";

export const RightNavLoggedOut = (props) => {
    let admin, adminMobile;
    if(props.state.admin) {
      admin = <FlatButton label="Admin" onTouchTap={() => browserHistory.push('/admin/dashboard') }/>
      adminMobile = <MenuItem primaryText="Admin" onTouchTap={() => browserHistory.push('/admin/dashboard') } />;
    }
    return (
      <Row>
        {/* desktop/iPad */}
        <Column md={12} hiddenXs={true}>
          <p>
            {admin}
            <FlatButton label="Rules" onTouchTap={() => browserHistory.push('/rules') }/>
            <FlatButton label="Prizes" onTouchTap={() => browserHistory.push('/prizes') }/>
            <FlatButton label="Sign In" onTouchTap={() => props.dispatch(toggleAuthDialogOpen())}/>
          </p>
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
            {adminMobile}
            <MenuItem primaryText="Rules" onTouchTap={() => browserHistory.push('/rules') } />
            <MenuItem primaryText="Prizes" onTouchTap={() => browserHistory.push('/prizes') } />
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
