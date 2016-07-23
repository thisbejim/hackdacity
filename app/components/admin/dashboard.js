// @flow
import React from 'react';

// material-ui
import {
  FlatButton, TextField, SelectField,
  MenuItem, DatePicker, TimePicker,
  IconButton, Divider, List,
  ListItem, IconMenu,
} from 'material-ui';

// icons
import ContentClear from 'material-ui/svg-icons/content/clear';
import ContentAdd from 'material-ui/svg-icons/content/add';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

// actions
import {
  getHackathons,
  toggleEditHackathon,
  deletePrize,
  deleteCategory,
  addPrize,
  addPrizeCategory,
  saveHackathon,
  updatePrize,
  updateCategory,
  updateDate,
} from '../../actions/actions';

// components
import {
  Row, Column,
} from '../grid/grid';

// types
import type { Admin } from '../../reducers/types';

const iconButtonElement = (
  <IconButton
    touch
    tooltip="more"
    tooltipPosition="bottom-left"
    style={{ top: 13 }}
  >
    <MoreVertIcon />
  </IconButton>
);

type Props = {
  dispatch: () => void,
  state: Admin
};

export class Dashboard extends React.Component {
  props: Props;
  componentDidMount() {
    this.props.dispatch(getHackathons());
  }
  render() {
    const dispatch = this.props.dispatch;
    const state = this.props.state;
    const selectFields = state.hackathons.map((hackathon) =>
      <MenuItem key={hackathon.id} value={hackathon.id} primaryText={`ID: ${hackathon.id}`} />
    );
    const selectedHackathon = state.hackathons.find((h) => h.id === state.selected);

    let startDate;
    let endDate;
    let prizeFields;
    let status;
    if (selectedHackathon) {
      startDate = new Date(selectedHackathon.startDate);
      endDate = new Date(selectedHackathon.endDate);
      status = selectedHackathon.status;
      // get hackathon prize categories
      const categories = state.categories.filter((c) => c.hackathonId === selectedHackathon.id);
      prizeFields = categories.map((category) => {
        // get prizes in category
        const prizes = state.prizes.filter((prize) => prize.categoryId === category.id)
        .map((prize) =>
          <ListItem
            key={prize.id}
            primaryText={
              <TextField
                id={prize.id}
                fullWidth
                disabled={state.editDisabled}
                defaultValue={prize.text}
                onChange={(event, value) => dispatch(updatePrize(prize.id, value))}
              />
            }
            rightIcon={
              <IconButton
                disabled={state.editDisabled}
                onTouchTap={() => dispatch(deletePrize(prize.id))}
              >
                <ContentClear />
              </IconButton>
            }
          />
        );
        return (
          <span key={category.id}>
            <Row>
              <Column md={3} sm={6}>
                <List>
                  <ListItem
                    rightIconButton={
                      <IconMenu iconButtonElement={iconButtonElement}>
                        <MenuItem onTouchTap={() => dispatch(deleteCategory(category.id))}>
                          Delete
                        </MenuItem>
                      </IconMenu>
                    }
                    primaryText={
                      <TextField
                        id={category.id}
                        fullWidth
                        disabled={state.editDisabled}
                        defaultValue={category.name}
                        onChange={(event, value) => dispatch(updateCategory(category.id, value))}
                      />
                    }
                  />
                  {prizes}
                </List>
                <IconButton
                  disabled={state.editDisabled}
                  onTouchTap={() => dispatch(addPrize(category.id))}
                >
                  <ContentAdd />
                </IconButton>
              </Column>
            </Row>
            <Row>
              <Column md={12}>
                <Divider />
              </Column>
            </Row>
          </span>
        );
      });
    }

    const adminButtons = state.editDisabled
      ?
      <div>
        <FlatButton label="Edit Hackathon" onTouchTap={() => dispatch(toggleEditHackathon())} />
        <FlatButton disabled label="Create New Hackathon" />
      </div>
      :
      <div>
        <FlatButton
          label="Save"
          onTouchTap={
            () => dispatch(saveHackathon(state.prizes, state.categories, state.hackathons))
          }
        />
        <FlatButton
          label="New Prize Category"
          onTouchTap={() => dispatch(addPrizeCategory(state.selected))}
        />
      </div>;
    return (
      <span>
        <h1>Dashboard</h1>
        <h2>current hackathon</h2>
        <SelectField value={state.selected}>
          {selectFields}
        </SelectField>
        <p>Status: {status}</p>
        <p>Dates displayed in local time.</p>
        <Row>
          <Column md={3} sm={6}>
            <DatePicker
              disabled={state.editDisabled}
              value={startDate}
              floatingLabelText="Start Date"
              onChange={(event, date) => dispatch(updateDate(state.selected, date, 'startDate'))}
            />
            <DatePicker
              disabled={state.editDisabled}
              value={endDate}
              floatingLabelText="End Date"
              onChange={(event, date) => dispatch(updateDate(state.selected, date, 'endDate'))}
            />
          </Column>
          <Column md={3} sm={6}>
            <TimePicker
              disabled={state.editDisabled}
              value={startDate}
              floatingLabelText="Start Time"
              onChange={(event, date) => dispatch(updateDate(state.selected, date, 'startDate'))}
            />
            <TimePicker
              disabled={state.editDisabled}
              value={endDate}
              floatingLabelText="End Time"
              onChange={(event, date) => dispatch(updateDate(state.selected, date, 'endDate'))}
            />
          </Column>
        </Row>
        <p>Prizes</p>
        {prizeFields}
        {adminButtons}
      </span>
    );
  }
}
