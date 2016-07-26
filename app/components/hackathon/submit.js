// @flow
import React from 'react';

// material-ui
import {
  TextField, Checkbox, FlatButton,
  IconButton,
} from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
// components
import { Row, Column } from '../grid/grid';

// actions
import { addToFormArray } from '../../actions/actions';

export const Submit = (props) => {
  console.log("submit", props.state)
  const hackathon = props.state.hackathon;
  const form = props.state.forms.submit;
  const checkboxes = props.state.hackathon.categories.map(
    (category) => <Checkbox label={category.name} />
  );
  const members = form.members.map((member, index) => {
    if (index === 0) {
      return (
        <TextField
          key={member.uid}
          fullWidth
          defaultValue={member.uid}
          disabled
        />
      );
    }
    return (
      <TextField
        key={member.uid}
        hintText="Github Link"
        floatingLabelText="Github Link"
        fullWidth
        defaultValue={member.uid}
      />
    );
  }
  );
  return (
    <Row>
      <Column md={3} />
      <Column md={6}>
        <h1>Submit a Project</h1>
        <p>Who is in your team?</p>
        {members}
        <IconButton
          onTouchTap={() => props.dispatch(
            addToFormArray('submit', 'members', { id: '', displayName: '' }, 4)
          )}
        >
          <ContentAdd />
        </IconButton>
        <br />
        <TextField
          key="githubLink"
          hintText="Github Link"
          floatingLabelText="Github Link"
          fullWidth
        />
        <br />
        <FlatButton label="Choose a Project Image" labelPosition="before">
          <input type="file" style={style.imageInput} />
        </FlatButton>
        <br />
        <p>Which prize categories do you wish to be considered for?</p>
        {checkboxes}
      </Column>
    </Row>
  );
};

const style = {
  imageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};
