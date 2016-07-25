// @flow
import React from 'react';

// moment
import moment from 'moment';

// components
import { Submissions } from '../hackathon/hackathon';
import { Row, Column } from '../grid/grid';

// types
import type { Hackathon, User } from '../../reducers/types';

type State = {
  hackathon: Hackathon,
  user: User
}

type Props = {
  dispatch: () => void,
  state: State
}

export const Home = (props: Props) => {
  const state = props.state.hackathon;
  const startDate = state.startDate;
  const endDate = state.endDate;
  if (startDate) {
    // check if the hackathon has started or ended
    const now = moment().valueOf();
    if (now < startDate && now < endDate) {
      const displayTimeTo = moment().to(moment(startDate));
      return (
        <Row>
          <Column md={12}>
            <h1>Hackdacity starts {displayTimeTo}</h1>
          </Column>
        </Row>
      );
    } else if (now > startDate && now < endDate) {
      return (
        <Submissions state={props.state} dispatch={props.dispatch} />
      );
    }
    return (
      <Row>
        <Column md={12}>
          <h1>Hackdacity is over!</h1>
        </Column>
      </Row>
    );
  }
  return (
    <span></span>
  );
};
