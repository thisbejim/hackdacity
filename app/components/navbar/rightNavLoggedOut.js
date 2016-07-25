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
import { toggleAuthDialogOpen } from '../../actions/actions';

// types
import type { User } from '../../reducers/types';

type Props = {
  dispatch: () => void,
  state: User
}

export const RightNavLoggedOut = (props: Props) => {
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
        <p>
          {admin}
          <FlatButton label="Rules" onTouchTap={() => browserHistory.push('/rules')} />
          <FlatButton label="Prizes" onTouchTap={() => browserHistory.push('/prizes')} />
          <FlatButton label="Sign In" onTouchTap={() => props.dispatch(toggleAuthDialogOpen())} />
        </p>
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
          <MenuItem primaryText="Rules" onTouchTap={() => browserHistory.push('/rules')} />
          <MenuItem primaryText="Prizes" onTouchTap={() => browserHistory.push('/prizes')} />
          <MenuItem
            primaryText="Sign In"
            onTouchTap={() => props.dispatch(toggleAuthDialogOpen())}
          />
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
