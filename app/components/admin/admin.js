// @flow
import React from 'react';

// components
import { Dashboard } from './dashboard';
import { Approve } from './approve';

type Props = {
  state: any,
  dispatch: () => void,
  children?: any
}

const Admin = (props: Props) => {
  let elements;
  if (props.children) {
    elements = React.cloneElement(
      props.children, { state: props.state.admin, dispatch: props.dispatch }
    );
  }
  return (
    <span>
      {elements}
    </span>
  );
};

export {
  Admin,
  Dashboard,
  Approve,
};
