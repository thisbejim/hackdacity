import React from 'react';

// components
import { Submissions } from '../submissions/submissions';

export class Home extends React.Component {
    render() {
      const state = this.props.state.home;
      console.log(state)
      let status;
      if(state.hackathon.status) {
        status = status
      }
      return (
        <div>{status}</div>
      )
    }
}
