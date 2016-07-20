import React from 'react';

// moment
import moment from "moment";

// components
import { Submissions } from '../submissions/submissions';
import { Row, Column } from '../grid/grid';

export class Home extends React.Component {
    render() {
      const state = this.props.state.hackathon;
      const startDate = state.startDate;
      const endDate = state.endDate;
      console.log(this.props.state)
      if(startDate) {
        // check if the hackathon has started or ended
        const now = moment().valueOf();
        if(now < startDate && now < endDate) {
          const displayTimeTo = moment().to(moment(startDate));
          return (
            <Row>
              <Column md={12}>
                <h1>Hackdacity starts {displayTimeTo}</h1>
              </Column>
            </Row>
          )
        } else if (now > startDate && now < endDate) {
          return (
            <Submissions state={this.props.state} dispatch={this.props.dispatch} />
          )
        } else {
          return (
            <Row>
              <Column md={12}>
                <h1>Hackdacity is over!</h1>
              </Column>
            </Row>
          )
        }
      } else {
        return (
          <span></span>
        )
      }
    }
}
