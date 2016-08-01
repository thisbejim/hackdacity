// @flow
import React from 'react';

// cropper
import AvatarEditor from 'react-avatar-editor';

// image
import projectPlaceholder from './project-placeholder.jpg';
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
  updateFormArray, removeFromFormArray,
} from '../../actions/actions';

export class Submit extends React.Component {
  render() {
    console.log("submit", this.props.state)
    const dispatch = this.props.dispatch;
    const hackathon = this.props.state.hackathon;
    const form = this.props.state.forms.submit;
    const categories = hackathon.categories;
    const checkboxes = categories.map(
      (category, index) => (
        <Checkbox
          key={index}
          checked={form.categories.some((id) => id === category.id)}
          label={category.name}
          onCheck={(event, isChecked) => {
            console.log(isChecked)
            if (isChecked) {
              dispatch(addToFormArray('submit', 'categories', category.id, categories.length));
            } else {
              dispatch(removeFromFormArray(index, 'submit', 'categories'));
            }
          }}
        />
      )
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
          dataSource={this.props.state.forms.autoComplete.members}
          onUpdateInput={(value) => dispatch(autoComplete('members', value))}
          onNewRequest={(value, requestIndex) => dispatch(
            updateFormArray(
              index, 'submit', 'members', { uid: value.uid, userName: value.userName }
            )
          )}
          dataSourceConfig={dataSourceConfig}
        />
      );
    });
    const { image, imgButton } = this.getImageAndButton(form);
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
              {image}
              {imgButton}
              <p className={responsive.textCenter} style={style.warning}>
                {form.errors.croppedImage}
              </p>
            </Column>
          </Row>
          <Row>
            <Column md={12}>
              <p>Title</p>
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
              <p>Description</p>
              <TextField
                key="description"
                hintText="Description"
                multiLine
                rows={2}
                rowsMax={4}
                fullWidth
                errorText={form.errors.description}
                onChange={(event) => dispatch(validateField('submit', 'description', event.target.value))}
              />
            </Column>
          </Row>
          <Row>
            <Column md={12}>
              <p>Who is in your team?</p>
              {members}
              <IconButton
                onTouchTap={() => dispatch(
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
              <span style={style.warning}>{form.errors.categories}</span>
            </Column>
          </Row>
          <Row>
            <Column md={12}>
              <FlatButton
                style={style.imgButton}
                label="Submit"
                onTouchTap={() => dispatch(validateForm(this.props.state.forms, 'submit'))}/>
            </Column>
          </Row>
        </Column>
      </Row>
    );
  }
  getImageAndButton(form) {
    let image;
    let imgButton;
    const dispatch = this.props.dispatch;
    if (form.selectedImage) {
      image = (
        <AvatarEditor
          ref="editor"
          image={form.selectedImage}
          width={358}
          height={358}
          border={50}
          color={[255, 255, 255, 0.6]} // RGBA
          scale={1.2}
          style={{ ...style.imgButton, ...style.img }}
        />
      );
      imgButton = (
        <FlatButton
          key="saveImage"
          style={style.imgButton}
          label="Crop"
          onTouchTap={() => this.handleImageCrop()}
        />
      );
    } else if (form.croppedImage) {
      image = (
        <img
          className={classNames(responsive.imgResponsive, responsive.centerBlock)}
          src={form.croppedImage}
          alt="project"
        />
    );
      imgButton = (
        <FlatButton key="selectImage" style={style.imgButton} label="Choose a Project Image" labelPosition="before">
          <input
            type="file"
            style={style.imageInput}
            onChange={(event) => dispatch(
              processFormImage('submit', 'selectedImage', event.target.files[0])
            )}
          />
        </FlatButton>
      );
    } else {
      image = (
        <img
          className={classNames(responsive.imgResponsive, responsive.centerBlock)}
          src={projectPlaceholder}
          alt="project"
        />
    );
      imgButton = (
        <FlatButton key="selectImage" style={style.imgButton} label="Choose a Project Image" labelPosition="before">
          <input
            type="file"
            style={style.imageInput}
            onChange={(event) => dispatch(
              processFormImage('submit', 'selectedImage', event.target.files[0])
            )}
          />
        </FlatButton>
      );
    }
    return { image, imgButton };
  }
  handleImageCrop() {
    const canvasScaled = this.refs.editor.getImageScaledToCanvas();
    this.props.dispatch(updateForm('submit', 'croppedImage', canvasScaled.toDataURL()));
    this.props.dispatch(updateForm('submit', 'selectedImage', null));
  }
}

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
  img: {
    display: 'block',
    maxWidth: '100%',
    height: 'auto',
  },
  warning: {
    color: '#f44336',
    fontSize: 12,
  },
};
