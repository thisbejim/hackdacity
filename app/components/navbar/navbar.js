import React from 'react';

// material-ui
import { AppBar } from 'material-ui';

export class NavBar extends React.Component {
  render() {
    return (
      <AppBar
        title="Title"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
      />
    )
  }
}
