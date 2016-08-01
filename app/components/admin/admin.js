// @flow
import React from 'react';

// material-ui
import { Tabs, Tab } from 'material-ui';

// components
import { Dashboard } from './dashboard';
import { Approve } from './approve';

// actions
import { changeAdminPage } from '../../actions/actions';


type Props = {
  state: any,
  dispatch: () => void,
  children?: any
}

const Admin = (props: Props) => {
  const state = props.state.admin;
  console.log(state)
  return (
    <span>
      <h1>Admin</h1>
      <Tabs value={state.page} onChange={(value) => props.dispatch(changeAdminPage(value))}>
        <Tab label="Hackathon" value="dashboard">
          <Dashboard state={state} dispatch={props.dispatch} />
        </Tab>
        <Tab label="Approve Users" value="approve">
          <Approve state={state} dispatch={props.dispatch} />
        </Tab>
      </Tabs>
    </span>
  );
};

export {
  Admin,
  Dashboard,
  Approve,
};
