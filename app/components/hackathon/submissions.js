// @flow
import React from 'react';

// material-ui
import {
  Tabs, Tab, Card, CardActions,
  CardMedia, CardHeader, FlatButton,
} from 'material-ui';

// components
import { Row, Column } from '../grid/grid';

// actions
import { changeTab, upvote, cancelVote } from '../../actions/actions';

// types
import type { User, Hackathon } from '../../reducers/types';
import type { Submission } from '../../actions/types';

type State = {
  user: User,
  hackathon: Hackathon
}

type Props = {
  state: State,
  dispatch: () => void,
  children?: any
}

export const Submissions = (props: Props) => {
  const uid = props.state.user.uid;
  const tab = props.state.hackathon.tab;

  const categories = props.state.hackathon.categories.map((category) => {
    // filter submissions by category id
    const submissions = props.state.hackathon.submissions.filter(
      (s) => s.categories.hasOwnProperty(category.id)
      // map each submission to component
      ).map((submission, index) =>
        <SubmissionCard
          uid={uid}
          index={index}
          submission={submission}
          dispatch={props.dispatch}
        />
    );
    return (
      <Tab key={category.id} label={category.name} value={category.id}>
        <Row>
          {submissions}
        </Row>
      </Tab>
    );
  });
  return (
    <span>
      <h1>Submissions</h1>
      <Tabs
        value={tab}
        onChange={(value) => props.dispatch(changeTab(value))}
        tabItemContainerStyle={style.tabContainer}
      >
        {categories}
      </Tabs>
    </span>
  );
};

type CardProps = {
  index: number,
  uid: ?string,
  submission: Submission,
  dispatch: () => void
}

const SubmissionCard = (props: CardProps) => {
  // determine if current user has voted for this submission or not
  const voteButton = props.submission.votes.hasOwnProperty(props.uid)
    ? <CancelVote dispatch={props.dispatch} submission={props.submission} uid={props.uid} />
    : <UpVote dispatch={props.dispatch} submission={props.submission} uid={props.uid} />;
  return (
    <Column key={props.index} md={4} sm={6}>
      <Card style={style.card}>
        <CardHeader title={"test"} />
        <CardMedia mediaStyle={style.cardMedia} >
          <img src={'http://placehold.it/350x350'} alt={"test"} />
        </CardMedia>
        <CardActions>
          {voteButton}
        </CardActions>
      </Card>
    </Column>
  );
};

type ButtonProps = {
  uid: ?string,
  submission: Submission,
  dispatch: () => void
};

const CancelVote = (props: ButtonProps) =>
  <FlatButton
    onTouchTap={() => props.dispatch(cancelVote(props.submission.id, props.uid))}
    label={props.submission.points}
    labelStyle={style.cancel}
    backgroundColor="green"
  />;

const UpVote = (props: ButtonProps) =>
  <FlatButton
    onTouchTap={() => props.dispatch(upvote(props.submission.id, props.uid))}
    label={props.submission.points}
    labelStyle={style.upvote}
    backgroundColor="red"
  />;


const style = {
  card: {
    marginTop: 15,
    boxShadow: 'rgba(0, 0, 0, 0.117647) 0 0 0, rgba(0, 0, 0, 0.117647) 0 0 0',
    borderWidth: 1,
    borderColor: '#d8d8d8',
    borderStyle: 'solid',
  },
  cardMedia: {
    height: 200,
    overflow: 'hidden',
  },
  tabContainer: {
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  cancel: {
    color: 'white',
  },
  upvote: {
    color: 'white',
  },
};
