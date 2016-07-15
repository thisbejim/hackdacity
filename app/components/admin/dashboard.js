import React from 'react';

// react-router
import { browserHistory } from 'react-router';

// material-ui
import {
  FlatButton, TextField, SelectField,
  MenuItem, DatePicker, TimePicker
} from 'material-ui';

// actions
import {
  getHackathons
} from "../../actions/actions";

// components
import {
  Row, Column
} from '../grid/grid';

export class Dashboard extends React.Component {
  componentDidMount() {
    this.props.dispatch(getHackathons())
  }
  render() {
    console.log(this.props.state.admin)
    const state = this.props.state.admin;
    const selectFields = state.hackathons.map((hackathon) => {
      return <MenuItem key={hackathon.id} value={hackathon.id} primaryText={hackathon.id} />
    });
    const selectedHackathon = state.hackathons.find((hackathon) => {
      return hackathon.id == state.selected
    });
    let startDate, endDate;
    if(selectedHackathon) {
      startDate = new Date(selectedHackathon.startDate);
      startDate.setHours(0, 0, 0, 0);

      endDate = new Date(selectedHackathon.endDate);
      endDate.setHours(0, 0, 0, 0);
    }
    console.log(startDate)
    return (
      <span>
        <h1>Dashboard</h1>
        <h2>current hackathon</h2>
        <SelectField value={state.selected}>
          {selectFields}
        </SelectField>
        <Row>
          <Column md={3} sm={6}>
            <DatePicker disabled={true} value={startDate} floatingLabelText="Start Date"/>
            <DatePicker disabled={true} value={startDate} hintText="End Date" floatingLabelText="End Date"/>
          </Column>
          <Column md={3} sm={6}>
            <TimePicker disabled={true} hintText="Start Time" floatingLabelText="Start Time"/>
            <TimePicker disabled={true} hintText="End Time" floatingLabelText="End Time"/>
          </Column>
        </Row>
        <p>Prizes</p>
        <Row>
          <p>Best iOS App</p>
        <div>
          <TextField
            fullWidth={true}
            disabled={true}
            defaultValue="Meet and greet with Amazon"
          />
        <br/>
          <TextField
            fullWidth={true}
            disabled={true}
            defaultValue="Apple Watch for each team member"
          />
        <br/>
          <TextField
            fullWidth={true}
            disabled={true}
            defaultValue="$100 Admob credits for each team member"
          />
      </div>
      </Row>
        <div>
          <FlatButton label="Edit Hackathon"/> <FlatButton label="Create New Hackathon"/>
        </div>
      </span>
    )
  }
}

// <TextField
//   key="Password"
//   hintText="Password"
//   floatingLabelText="Password"
//   fullWidth={true}
//   onChange={(evt, value) => password = value}
// />
