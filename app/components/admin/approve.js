// @flow
import React from 'react';

// material-ui
import {
  List, ListItem, Subheader,
  Checkbox, Divider,
} from 'material-ui';

// icons
import { ContentClear } from 'material-ui/svg-icons';

// actions
import {
  getApplicants, validApplicant, detachApplicantListener,
  getSlackCredentials, invalidApplicant,
} from '../../actions/actions';

// types
import type { Admin } from '../../reducers/types';

type Props = {
  dispatch: () => void,
  state: Admin
};

export class Approve extends React.Component {
  props: Props;
  componentDidMount() {
    const dispatch = this.props.dispatch;
    dispatch(getSlackCredentials());
    dispatch(getApplicants());
  }
  componentWillUnmount() {
    this.props.dispatch(detachApplicantListener());
  }
  render() {
    const dispatch = this.props.dispatch;
    const admin = this.props.state;
    const applicants = admin.applicants.map((applicant) =>
      <span key={applicant.id}>
        <ListItem
          primaryText={applicant.email}
          secondaryText={applicant.name}
          leftCheckbox={
            <Checkbox
              onCheck={() => dispatch(
                validApplicant(applicant.id, applicant.name, applicant.email, admin.slack.token)
              )}
            />
          }
          rightIcon={
            <ContentClear onClick={() => dispatch(invalidApplicant(applicant.id))} />
          }
        />
        <Divider inset />
      </span>
    );
    return (
      <List style={style.list}>
        <Subheader>
          Applicants
        </Subheader>
        {applicants}
      </List>
    );
  }
}

const style = {
  list: {
    maxWidth: 500,
  },
};
