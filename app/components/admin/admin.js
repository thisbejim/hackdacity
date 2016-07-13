import React from 'react';

// material-ui
import {
  List, ListItem, Subheader,
  Checkbox, IconButton, LinearProgress,
  Divider
} from 'material-ui';
// icons
import { ContentClear } from 'material-ui/svg-icons';
// actions
import {
  getApplicants, validApplicant, detachApplicantListener,
  getSlackCredentials, invalidApplicant
} from "../../actions/actions";

export class Admin extends React.Component {
  componentDidMount() {
    const dispatch = this.props.dispatch;
    dispatch(getApplicants());
    dispatch(getSlackCredentials());
  }
  componentWillUnmount() {
    this.props.dispatch(detachApplicantListener());
  }
  render() {
    const dispatch = this.props.dispatch;
    const admin = this.props.state.admin;
    console.log(admin)
    const applicants = admin.applicants.map((applicant, index) => {
      return (
        <span>
        <ListItem
          key={applicant.id}
          primaryText={applicant.email}
          secondaryText={applicant.name}
          leftCheckbox={
            <Checkbox
              onCheck={() => dispatch(validApplicant(applicant.id, applicant.email, admin.slack.token))}/>
          }
          rightIcon={<ContentClear onClick={() => dispatch(invalidApplicant(applicant.id))}/>}
        />
        <Divider inset={true} />
        </span>
      )
    });
    return (
      <List style={{maxWidth: 500}}>
        <Subheader>Applicants</Subheader>
        {applicants}
      </List>
    )
  }
}
