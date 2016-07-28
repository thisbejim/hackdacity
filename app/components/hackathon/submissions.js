// @flow
import React from 'react';

// material-ui
import {
  Tabs, Tab, Card, CardActions,
  CardMedia, CardHeader, FlatButton,
  CardText,
} from 'material-ui';

// components
import { Row, Column } from '../grid/grid';

// image
import projectPlaceholder from './grey-placeholder.jpg';

// css
import responsive from '../../css/responsive.css';

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
    const subs = props.state.hackathon.submissions.filter(
      (s) => s.categoryId === category.id
      // map each submission to component
      ).map((submission, index) =>
        <SubmissionCard
          key={submission.id}
          uid={uid}
          index={index}
          submission={submission}
          dispatch={props.dispatch}
        />
    );
    const submissions = subs.length > 0
      ? subs
      : <p style={style.noSubmissions}>No submissions in this category yet!</p>;
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
        <CardMedia mediaStyle={style.cardMedia}>
          <img className={responsive.imgResponsive} src={props.submission.image} alt={"test"} />
        </CardMedia>
        <CardText>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec mattis pretium massa.
    </CardText>
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
    backgroundImage: `url(${projectPlaceholder})`,
    height: 358,
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
  noSubmissions: {
    marginLeft: 14,
  },
};
