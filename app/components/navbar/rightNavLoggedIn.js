// @flow
import React from 'react';

// react-router
import { browserHistory } from 'react-router';

// material-ui
import { FlatButton, IconButton, IconMenu, MenuItem } from 'material-ui';
import { NavigationMoreVert } from 'material-ui/svg-icons';

// components
import { Row, Column } from '../grid/grid';

// actions
import { signOut } from '../../actions/actions';

// types
import type { Admin } from '../../reducers/types';

type State = {
  admin: Admin
}

type Props = {
  dispatch: () => void,
  state: State
}

export const RightNavLoggedIn = (props: Props) => {
  let admin;
  let adminMobile;
  if (props.state.admin) {
    admin = <FlatButton label="Admin" onTouchTap={() => browserHistory.push('/admin/dashboard')} />;
    adminMobile = (
      <MenuItem
        primaryText="Admin"
        onTouchTap={() => browserHistory.push('/admin/dashboard')}
      />
    );
  }
  return (
    <Row>
      {/* desktop/iPad */}
      <Column md={12} hiddenXs>
        {admin}
        <FlatButton label="Submit" onTouchTap={() => browserHistory.push('/submit')} />
        <FlatButton label="Rules" onTouchTap={() => browserHistory.push('/rules')} />
        <FlatButton label="Prizes" onTouchTap={() => browserHistory.push('/prizes')} />
        <IconMenu
          iconButtonElement={
            <IconButton style={style.iconButton} iconStyle={style.icon}>
              <NavigationMoreVert />
            </IconButton>
          }
          targetOrigin={style.target}
          anchorOrigin={style.target}
        >
          <MenuItem primaryText="Sign out" onTouchTap={() => props.dispatch(signOut())} />
        </IconMenu>
      </Column>
      {/* mobile */}
      <Column md={12} visibleXs>
        <IconMenu
          iconButtonElement={
            <IconButton style={style.iconButton} iconStyle={style.icon}>
              <NavigationMoreVert />
            </IconButton>
          }
          targetOrigin={style.target}
          anchorOrigin={style.target}
        >
          {adminMobile}
          <MenuItem primaryText="Submit" onTouchTap={() => browserHistory.push('/submit')} />
          <MenuItem primaryText="Rules" onTouchTap={() => browserHistory.push('/rules')} />
          <MenuItem primaryText="Prizes" onTouchTap={() => browserHistory.push('/prizes')} />
          <MenuItem primaryText="Sign out" onTouchTap={() => props.dispatch(signOut())} />
        </IconMenu>
      </Column>
    </Row>
  );
};

const style = {
  icon: {
    width: 24,
    height: 24,
  },
  iconButton: {
    top: 7,
  },
  target: {
    horizontal: 'right',
    vertical: 'top',
  },
};
