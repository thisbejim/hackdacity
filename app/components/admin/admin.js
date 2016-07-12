import React from 'react';

// material-ui
import { List, ListItem, Subheader } from 'material-ui';

// actions
import { getApplicants } from "../../actions/actions";

export class Admin extends React.Component {
  componentDidMount() {
    this.props.dispatch(getApplicants())
  }
  render() {
    console.log(this.props.state)
    const admin = this.props.state.admin;
    const applicants = admin.applicants.map((applicant, index) => {
      return (
        <ListItem
          key={index}
          primaryText={applicant.email}
          secondaryText={applicant.name}
        />
      )
    });
    return (
      <List>
        <Subheader>Applicants</Subheader>
        {applicants}
      </List>
    )
  }
}
