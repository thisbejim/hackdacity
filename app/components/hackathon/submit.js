// @flow
import React from 'react';

// cropper
import Cropper from 'react-cropper';

// image
import example from './example.jpg';
// classnames
import classNames from 'classnames';

// material-ui
import {
  TextField, Checkbox, FlatButton,
  IconButton, AutoComplete,
} from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';

// components
import { Row, Column } from '../grid/grid';
// css
import responsive from '../../css/responsive.css';

// actions
import {
  validateForm, validateField, updateForm,
  addToFormArray, processFormImage, autoComplete,
  updateFormArray,
} from '../../actions/actions';

export const Submit = (props) => {
  console.log("submit", props.state)
  const dispatch = props.dispatch;
  const hackathon = props.state.hackathon;
  const form = props.state.forms.submit;
  const checkboxes = props.state.hackathon.categories.map(
    (category, index) => <Checkbox key={index} label={category.name} />
  );
  const members = form.members.map((member, index) => {
    if (index === 0) {
      return (
        <TextField
          key={index}
          name=""
          fullWidth
          defaultValue={member.userName}
          disabled
        />
      );
    }
    const dataSourceConfig = {
      text: 'userName',
      value: 'uid',
    };
    return (
      <AutoComplete
        key={index}
        hintText="Username"
        filter={AutoComplete.caseInsensitiveFilter}
        dataSource={props.state.forms.autoComplete.members}
        onUpdateInput={(value) => dispatch(autoComplete('members', value))}
        onNewRequest={(value, requestIndex) => dispatch(
          updateFormArray(index, 'submit', 'members', { uid: value.uid, userName: value.userName })
        )}
        dataSourceConfig={dataSourceConfig}
      />
    );
  });
  const image = form.image ? form.image : example;
  return (
    <Row>
      <Column md={3} />
      <Column md={6}>
        <Row>
          <Column md={12}>
            <h1 className={responsive.textCenter}>Submit a Project</h1>
          </Column>
        </Row>
        <Row>
          <Column md={12}>
            <img className={classNames(responsive.imgResponsive, responsive.centerBlock)} src={image} alt={"test"} />
            <FlatButton style={style.imgButton} label="Choose a Project Image" labelPosition="before">
              <input type="file" style={style.imageInput} onChange={
                  (event) => dispatch(processFormImage('submit', 'image', event.target.files[0]))
                }
              />
            </FlatButton>
            <p className={responsive.textCenter}>{form.errors.image}</p>
          </Column>
        </Row>
        <Row>
          <Column md={12}>
            <p>Project Title</p>
            <TextField
              key="title"
              hintText="Title"
              fullWidth
              errorText={form.errors.title}
              onChange={(event) => dispatch(validateField('submit', 'title', event.target.value))}
            />
          </Column>
        </Row>
        <Row>
          <Column md={12}>
            <p>Who is in your team?</p>
            {members}
            <IconButton
              onTouchTap={() => props.dispatch(
                addToFormArray('submit', 'members', { uid: '', userName: '' }, 4)
              )}
            >
              <ContentAdd />
            </IconButton>
          </Column>
        </Row>
        <Row>
          <Column md={12}>
            <p>Project Github link</p>
            <TextField
              key="githubLink"
              hintText="Github Link"
              fullWidth
              errorText={form.errors.github}
              onChange={(event) => dispatch(validateField('submit', 'github', event.target.value))}
            />
          </Column>
        </Row>
        <Row>
          <Column md={12}>
            <p>Which prize categories do you wish to be considered for?</p>
            {checkboxes}
          </Column>
        </Row>
        <Row>
          <Column md={12}>
            <FlatButton
              style={style.imgButton}
              label="Submit"
              onTouchTap={() => dispatch(validateForm(props.state.forms, 'submit'))}/>
          </Column>
        </Row>
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
  imgButton: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
};
