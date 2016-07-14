import React from 'react';

import { Dashboard } from "./dashboard";
import { Approve } from "./approve";

const Admin = (props) => {
  let elements;
  if(props.children) {
    elements = React.cloneElement(props.children, { state: props.state, dispatch: props.dispatch })
  }
  return (
    <span>
      {elements}
    </span>
  )
}

export {
  Admin,
  Dashboard,
  Approve
}
